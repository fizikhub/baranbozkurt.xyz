---
name: reduced-motion-high-contrast
description: >-
  Inclusive design for vestibular disorders and low vision. Use for prefers-reduced-motion media query implementation, disabling parallax/spinners, prefers-contrast adaptations, and Windows High Contrast mode.
---

# Reduced Motion & High Contrast Adaptation

## Overview
Vestibular disorders cause dizziness, nausea, and disorientation when viewing motion effects like parallax, spinning loaders, and zoom transitions.

## Universal Reduced Motion Fallback
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Respectful JavaScript Motion Handling
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  startParallaxBanner();
}
```

## High Contrast Mode Support
Ensure borders and key interactive boundaries remain crisp in Forced Colors mode:
```css
@media (forced-colors: active) {
  .btn-primary {
    border: 2px solid ButtonText;
  }
}
```
