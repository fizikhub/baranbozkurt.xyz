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

  // Resume story: scroll only explains which sheet has come to the surface.
  // The content remains complete with JavaScript disabled or reduced motion on.
  const resumeScenes = [...document.querySelectorAll('[data-resume-scene]')];
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const forceReducedMotion = new URLSearchParams(window.location.search).get('reduce') === '1';
  let resumeFrame = null;
  let sceneObserver;

  const clearResumeMotion = () => {
    resumeScenes.forEach((scene) => {
      scene.classList.remove('is-active');
      scene.style.removeProperty('--scene-lift');
      scene.style.removeProperty('--scene-tilt');
      scene.style.removeProperty('--scene-figure-y');
      scene.style.removeProperty('--scene-figure-tilt');
    });
  };

  const updateResumeMotion = () => {
    resumeFrame = null;
    const viewport = window.innerHeight;

    resumeScenes.forEach((scene, index) => {
      const bounds = scene.getBoundingClientRect();
      const start = viewport * 0.76;
      const end = -bounds.height * 0.2;
      const progress = Math.min(1, Math.max(0, (start - bounds.top) / (start - end)));
      const direction = index % 2 === 0 ? 1 : -1;
      const lift = Math.round((0.5 - progress) * 34);
      const tilt = ((1 - progress) * direction * 2.2).toFixed(2);
      const figureLift = Math.round((1 - progress) * 26);
      const figureTilt = ((1 - progress) * direction * -1.2).toFixed(2);

      scene.style.setProperty('--scene-lift', `${lift}px`);
      scene.style.setProperty('--scene-tilt', `${tilt}deg`);
      scene.style.setProperty('--scene-figure-y', `${figureLift}px`);
      scene.style.setProperty('--scene-figure-tilt', `${figureTilt}deg`);
    });
  };

  const requestResumeUpdate = () => {
    if (!resumeFrame) resumeFrame = window.requestAnimationFrame(updateResumeMotion);
  };

  const setupResumeMotion = () => {
    const reduced = forceReducedMotion || reducedMotionQuery.matches;
    const desktopStory = window.matchMedia('(min-width: 781px)').matches;
    document.documentElement.classList.toggle('motion-reduced', reduced);

    if (sceneObserver) sceneObserver.disconnect();
    clearResumeMotion();

    if (reduced || !desktopStory || !resumeScenes.length) return;

    sceneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-active', entry.isIntersecting));
    }, { rootMargin: '8% 0px', threshold: 0.1 });

    resumeScenes.forEach((scene) => sceneObserver.observe(scene));
    requestResumeUpdate();
  };

  window.addEventListener('scroll', requestResumeUpdate, { passive: true });
  window.addEventListener('resize', setupResumeMotion, { passive: true });
  reducedMotionQuery.addEventListener('change', setupResumeMotion);
  setupResumeMotion();
  window.__resumeStoryReady = true;

  // Friendly console greeting
  console.log(
    '%c:) Crafted with clean HTML5 & CSS3 for Baran Bozkurt',
    'font-size: 14px; font-weight: bold; color: #e35342; background: #212121; padding: 4px 8px; border-radius: 4px;'
  );
});
