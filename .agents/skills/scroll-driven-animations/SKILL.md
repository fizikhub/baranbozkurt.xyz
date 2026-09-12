---
name: scroll-driven-animations
description: >-
  Modern pure CSS Scroll-Driven Animations. Use for scroll-progress indicators, parallax hero banners, sticky image reveals, and header compression without any JavaScript or scroll event listeners.
---

# Pure CSS Scroll-Driven Animations

## Overview
CSS Scroll-Driven Animations link `@keyframes` directly to scroll containers (`animation-timeline: scroll()`) or element visibility in viewport (`animation-timeline: view()`) completely off the main JavaScript thread.

## 1. Top Reading Progress Bar (Zero JS)
```css
@keyframes progressGrowth {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.scroll-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #6366f1, #ec4899);
  transform-origin: left;
  animation: progressGrowth auto linear;
  animation-timeline: scroll(root);
}
```

## 2. Element View Progress (Reveal on Enter)
```css
@keyframes revealCard {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(40px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.feature-card {
  animation: revealCard linear both;
  animation-timeline: view();
  animation-range: entry 10% cover 35%;
}
```

## Browser Support & Fallback
Always provide baseline visible styling by default so older browsers see the fully styled card without opacity: 0.
