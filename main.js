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

  // Friendly console greeting
  console.log(
    '%c:) Crafted with clean HTML5 & CSS3 for Baran Bozkurt',
    'font-size: 14px; font-weight: bold; color: #e35342; background: #212121; padding: 4px 8px; border-radius: 4px;'
  );
});
