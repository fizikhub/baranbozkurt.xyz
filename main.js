// Baran Bozkurt — Portfolio Scripts
// Lightweight, zero-dependency vanilla JS with smooth 60fps scroll animations

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll for internal anchor links (#cv, #work, #connect)
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

  // 2. Scroll-Driven Element Reveals (IntersectionObserver)
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve once revealed for max scroll performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback for very old environments
    revealElements.forEach((el) => el.classList.add('is-revealed'));
  }

  // 3. Technical Ledger Spine Scroll-Progress & Active Markers
  const cvSection = document.querySelector('.cv-ledger-section');
  const spineProgress = document.querySelector('.ledger-spine-progress');
  const ledgerBlocks = document.querySelectorAll('.ledger-block');
  const spineMarkers = document.querySelectorAll('.spine-marker');

  if (cvSection && spineProgress) {
    let ticking = false;

    const updateSpineOnScroll = () => {
      const rect = cvSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate progress between when section enters center of viewport and when it leaves
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const startTrigger = viewportHeight * 0.75;
      const endTrigger = viewportHeight * 0.25;

      const scrolledDistance = startTrigger - sectionTop;
      const totalDistance = sectionHeight - (endTrigger - startTrigger);

      let percentage = (scrolledDistance / totalDistance) * 100;
      percentage = Math.max(0, Math.min(100, percentage));

      spineProgress.style.height = `${percentage}%`;

      // Update active state of markers based on each block's viewport position
      ledgerBlocks.forEach((block, index) => {
        const blockRect = block.getBoundingClientRect();
        const marker = spineMarkers[index];
        if (marker) {
          if (blockRect.top < viewportHeight * 0.6 && blockRect.bottom > viewportHeight * 0.2) {
            marker.classList.add('is-active');
          } else {
            marker.classList.remove('is-active');
          }
        }
      });

      ticking = false;
    };

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(updateSpineOnScroll);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check on load
    updateSpineOnScroll();
  }

  // 4. Subtle 3D Card Tilt on Mouse Move (Desktop Only)
  if (window.matchMedia('(hover: hover) and (min-width: 810px)').matches) {
    const tiltCards = document.querySelectorAll('.skill-index-card, .cv-project-row');

    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Doodle parallax on hero
    const doodles = document.querySelectorAll('.doodle');
    document.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 12;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 12;

      doodles.forEach((doodle, index) => {
        const factor = (index + 1) * 0.4;
        doodle.style.transform = `translate(${mouseX * factor}px, ${mouseY * factor}px)`;
      });
    });
  }

  // 5. Friendly console greeting
  console.log(
    '%c:) Crafted with clean HTML5 & CSS3 for Baran Bozkurt (fizikhub.com)',
    'font-size: 14px; font-weight: bold; color: #e35342; background: #212121; padding: 4px 8px; border-radius: 4px;'
  );
});
