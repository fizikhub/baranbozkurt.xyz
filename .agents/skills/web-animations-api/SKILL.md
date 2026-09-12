---
name: web-animations-api
description: >-
  Native Web Animations API (WAAPI) implementation. Use for programmatic, high-performance imperative animations in JavaScript with full playback control (play, pause, reverse, finish, scrub, playbackRate).
---

# Web Animations API (WAAPI)

## Overview
The Web Animations API combines the performance benefits of CSS animations with the imperative flexibility and timeline control of JavaScript.

## Implementation Patterns

### 1. Element.animate() with Dynamic Keyframes
```javascript
const element = document.querySelector('.card');
const animation = element.animate([
  { transform: 'scale(1) translateY(0px)', opacity: 1, filter: 'blur(0px)' },
  { transform: 'scale(0.95) translateY(12px)', opacity: 0.5, filter: 'blur(4px)' }
], {
  duration: 350,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  fill: 'forwards'
});

// Full imperative control
buttonPause.onclick = () => animation.pause();
buttonPlay.onclick = () => animation.play();
buttonReverse.onclick = () => animation.reverse();
animation.playbackRate = 1.5; // speed up
```

### 2. Waiting for Animation Completion via Promises
```javascript
await animation.finished;
console.log('Animation cleanly resolved!');
```

### 3. Synchronizing Multiple Elements
```javascript
function morphElements(elements) {
  return elements.map((el, i) => {
    return el.animate([
      { transform: 'translateY(40px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 }
    ], {
      duration: 500,
      delay: i * 50,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      fill: 'both'
    });
  });
}
```

### When to Use
- When you need dynamic start/end values computed at runtime (e.g. cursor coordinates, element bounding rects).
- When you need lightweight animations without importing heavy libraries like GSAP.
