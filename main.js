// Baran Bozkurt — Portfolio Scripts
// Lightweight, zero-dependency vanilla JS

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Subtle interactive doodle tilt on mouse move (Desktop)
  const doodles = document.querySelectorAll('.doodle');
  if (window.matchMedia('(hover: hover) and (min-width: 810px)').matches) {
    document.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 12;

      doodles.forEach((doodle, index) => {
        const factor = (index + 1) * 0.4;
        doodle.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
      });
    });
  }

  // ==========================================================================
  // CV / FIELD NOTES TORN SCRAPBOOK CONTROLLER
  // ==========================================================================
  const cvSection = document.querySelector('.cv-scrapbook-section');
  if (cvSection) {
    const cards = Array.from(cvSection.querySelectorAll('.torn-paper-card'));
    const storyPanels = Array.from(cvSection.querySelectorAll('.story-panel'));
    const tabButtons = Array.from(cvSection.querySelectorAll('.scrap-tab-btn'));
    const totalCards = cards.length;
    let activeCardIndex = 0;
    let isUserInteracting = false;
    let audioCtx = null;

    // Procedural soft paper rustle / tactile tick sound (zero asset overhead)
    function playPaperTick() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      try {
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.value = 1600;
        filter.Q.value = 3;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.04);

        gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
      } catch (err) {
        // AudioContext restricted before first gesture - safely ignore
      }
    }

    // Set active card index with organic physical fan stacking
    function setActiveCard(index, playSound = true) {
      if (index < 0 || index >= totalCards) return;
      if (index === activeCardIndex && cards[index].classList.contains('card-active')) return;

      activeCardIndex = index;

      if (playSound) playPaperTick();

      // Update Card Deck transforms
      cards.forEach((card, i) => {
        const baseRot = parseFloat(card.style.getPropertyValue('--card-rot')) || 0;
        
        if (i === activeCardIndex) {
          card.classList.add('card-active');
          card.style.zIndex = '12';
          card.style.opacity = '1';
          card.style.transform = `translate3d(0, 0, 30px) rotate(${baseRot}deg) scale(1.02)`;
        } else {
          card.classList.remove('card-active');
          const diff = i - activeCardIndex;
          
          if (diff < 0) {
            // Cards that have passed: slide up and fade
            card.style.zIndex = `${3 + i}`;
            card.style.opacity = '0.55';
            card.style.transform = `translate3d(0, ${diff * 14}px, 0) rotate(${baseRot - 2}deg) scale(0.96)`;
          } else {
            // Cards waiting in the deck behind: layered down
            card.style.zIndex = `${10 - diff}`;
            card.style.opacity = `${Math.max(0.65, 1 - diff * 0.1)}`;
            card.style.transform = `translate3d(0, ${diff * 14}px, 0) rotate(${baseRot}deg) scale(${1 - diff * 0.025})`;
          }
        }
      });

      // Update Story Panels
      storyPanels.forEach((panel, i) => {
        if (i === activeCardIndex) {
          panel.classList.add('panel-active');
        } else {
          panel.classList.remove('panel-active');
        }
      });

      // Update Navigation Tabs
      tabButtons.forEach((btn, i) => {
        if (i === activeCardIndex) {
          btn.classList.add('active');
          if (window.innerWidth <= 810) {
            btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          }
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Initialize initial card positions
    setActiveCard(0, false);

    // Tab button click listener
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(btn.dataset.target, 10);
        isUserInteracting = true;
        setActiveCard(targetIdx, true);
        setTimeout(() => { isUserInteracting = false; }, 800);
      });
    });

    // Card click listener (clicking any card brings it forward)
    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const targetIdx = parseInt(card.dataset.index, 10);
        isUserInteracting = true;
        setActiveCard(targetIdx, true);
        setTimeout(() => { isUserInteracting = false; }, 800);
      });
    });

    // Mobile touch swipe gestures on workbench
    let touchStartX = 0;
    let touchStartY = 0;
    const workbench = cvSection.querySelector('.cv-workbench');

    if (workbench) {
      workbench.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      workbench.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Ensure horizontal swipe is dominant
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
          if (diffX < 0 && activeCardIndex < totalCards - 1) {
            // Swipe Left -> Next card
            setActiveCard(activeCardIndex + 1, true);
          } else if (diffX > 0 && activeCardIndex > 0) {
            // Swipe Right -> Prev card
            setActiveCard(activeCardIndex - 1, true);
          }
        }
      }, { passive: true });
    }

    // Scroll Observer: automatically advance cards as user scrolls down the section
    let lastScrollTime = 0;
    window.addEventListener('scroll', () => {
      if (isUserInteracting) return;
      const now = Date.now();
      if (now - lastScrollTime < 50) return; // throttle
      lastScrollTime = now;

      const rect = cvSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // When section is active in the middle of viewport
      if (rect.top <= viewportHeight * 0.45 && rect.bottom >= viewportHeight * 0.25) {
        const sectionScrollProgress = (viewportHeight * 0.45 - rect.top) / (rect.height * 0.85);
        const clampedProgress = Math.max(0, Math.min(0.999, sectionScrollProgress));
        const calculatedIndex = Math.floor(clampedProgress * totalCards);

        if (calculatedIndex !== activeCardIndex && calculatedIndex >= 0 && calculatedIndex < totalCards) {
          setActiveCard(calculatedIndex, true);
        }
      }
    }, { passive: true });
  }

  // Friendly console greeting
  console.log(
    '%c:) Crafted with clean HTML5 & CSS3 for Baran Bozkurt',
    'font-size: 14px; font-weight: bold; color: #e35342; background: #212121; padding: 4px 8px; border-radius: 4px;'
  );
});
