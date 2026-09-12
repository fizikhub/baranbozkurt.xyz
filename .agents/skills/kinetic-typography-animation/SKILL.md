---
name: kinetic-typography-animation
description: >-
  Advanced kinetic typography and expressive type animation. Use for variable font axis manipulation (wght, wdth, slnt) linked to cursor/scroll velocity, staggered character/word split reveals, SVG text-on-path warping, momentum tickers, and typographic decoders.
---

# Kinetic Typography & Expressive Type Animation

## Overview
Kinetic typography transforms text from static content into an expressive, living voice. By orchestrating variable fonts, character-level split transforms, and physics-driven motion, typography becomes an emotional anchor for the brand.

---

## 1. Velocity-Reactive Variable Font Morphing

Variable fonts allow fluid interpolation along continuous design axes (`wght` for weight, `wdth` for width, `slnt` for slant).

```css
.kinetic-heading {
  font-family: 'DM Sans', sans-serif;
  font-variation-settings: 'wght' 400, 'wdth' 100;
  transition: font-variation-settings 180ms cubic-bezier(0.16, 1, 0.3, 1);
  will-change: font-variation-settings;
}
```

```javascript
let lastX = 0, lastY = 0, lastTime = performance.now();
const heading = document.querySelector('.kinetic-heading');

window.addEventListener('pointermove', (e) => {
  const now = performance.now();
  const dt = Math.max(now - lastTime, 1);
  const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
  const velocity = Math.min(dist / dt, 10); // Clamp velocity

  // Map velocity: faster pointer moves = bolder/wider font
  const targetWeight = 400 + Math.round(velocity * 40); // 400 to 800
  heading.style.fontVariationSettings = `'wght' ${targetWeight}`;

  lastX = e.clientX;
  lastY = e.clientY;
  lastTime = now;
});
```

---

## 2. Accessible Staggered Character / Line Split Reveal

Ensure screen readers see the full un-split string using `aria-label` while visual users see animated spans.

```html
<h1 class="split-reveal" aria-label="Software should feel natural">
  <!-- JavaScript populates individual character spans with overflow: hidden wrappers -->
</h1>
```

```javascript
function initSplitReveal(element) {
  const text = element.getAttribute('aria-label') || element.textContent.trim();
  element.setAttribute('aria-label', text);
  element.innerHTML = '';

  const words = text.split(' ');
  words.forEach((word, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'split-word';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.overflow = 'hidden';
    wordSpan.style.verticalAlign = 'top';

    [...word].forEach((char, cIdx) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.textContent = char;
      charSpan.style.display = 'inline-block';
      charSpan.style.transform = 'translateY(110%)';
      charSpan.style.transition = `transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${(wIdx * 60) + (cIdx * 25)}ms`;
      wordSpan.appendChild(charSpan);
    });

    element.appendChild(wordSpan);
    if (wIdx < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }
  });

  // Trigger reveal when visible
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      element.querySelectorAll('.split-char').forEach(c => c.style.transform = 'translateY(0%)');
      observer.disconnect();
    }
  }, { threshold: 0.2 });

  observer.observe(element);
}
```

---

## 3. Typographic Scramble / Decoder Effect

Classic high-tech editorial reveal where characters resolve one by one:

```javascript
function scrambleText(element, finalText, duration = 1200) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const resolvedChars = Math.floor(progress * finalText.length);

    let output = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < resolvedChars || finalText[i] === ' ') {
        output += finalText[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = output;
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}
```

---

## 4. Momentum Infinite Ticker (Marquee)

```css
.ticker-wrapper {
  overflow: hidden;
  display: flex;
  white-space: nowrap;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
}

.ticker-track {
  display: flex;
  animation: ticker-slide 20s linear infinite;
  will-change: transform;
}

.ticker-track:hover {
  animation-play-state: paused;
}

@keyframes ticker-slide {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
    transform: none;
  }
}
```

---

## 5. Golden Rules for Kinetic Typography
- Always preserve accessibility: keep full sentences accessible to screen readers using `aria-label` or duplicate visually hidden containers.
- Avoid animating `letter-spacing` or `font-size` directly as they cause CPU reflows. Use `transform: scale()` or `font-variation-settings`.
- Implement `prefers-reduced-motion` fallbacks to render static, fully formed typography instantly.
