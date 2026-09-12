---
name: css-transitions-keyframes
description: >-
  High-performance GPU-accelerated CSS animations and transitions. Use for crafting buttery 60/120fps CSS micro-interactions, custom cubic-bezier timing curves, spring simulations in pure CSS, and keyframe sequencing.
---

# High-Performance CSS Keyframes & Transitions

## Overview
CSS animations offloaded to the compositor thread run without blocking main thread JavaScript execution, guaranteeing 60fps/120fps smoothness.

## Core Rules for Compositor Acceleration
Only two properties are guaranteed to be fully GPU-composited:
1. `transform` (`translate3d`, `scale`, `rotate`)
2. `opacity`

### Custom Easing & Natural Physics
Standard `ease` or `linear` feels robotic. Use cubic-bezier curves modeled after natural deceleration:
```css
:root {
  /* Snappy spring-like curve */
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  /* Smooth decelerate (Material style) */
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
  /* Smooth entry */
  --ease-in-out-smooth: cubic-bezier(0.65, 0, 0.35, 1);
}

.button {
  transition: transform 250ms var(--ease-elastic), box-shadow 250ms var(--ease-out-quint);
}
.button:hover {
  transform: translateY(-2px) scale(1.02);
}
.button:active {
  transform: translateY(1px) scale(0.98);
}
```

### Staggered Reveal Keyframes
```css
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item {
  animation: slideUpFade 400ms var(--ease-out-quint) both;
  animation-delay: calc(var(--index, 0) * 60ms);
}
```

### Rules & Checklist
- **`will-change` usage**: Apply `will-change: transform` only to elements currently animating, or on hover states. Never declare `will-change: all` across the whole page.
- Always include `backface-visibility: hidden` and `transform: translateZ(0)` when sub-pixel text rendering artifacts occur during scaling.
