---
name: flip-layout-animations-orchestration
description: >-
  First-Last-Invert-Play (FLIP) layout animation architecture. Use for shared element transitions, smooth card-to-modal expansions, reorderable grid transitions, and zero-jank dynamic DOM transformations.
---

# FLIP Layout Animations & Shared Element Morphing

## Overview
Animating layout properties like `width`, `height`, `top`, or `grid-template-columns` triggers expensive browser layout recalculations and repaints, resulting in dropped frames. 

The **FLIP** technique (First, Last, Invert, Play) solves this by calculating bounding box differences before and after DOM modifications, then animating the element entirely using GPU-accelerated `transform` and `opacity`.

---

## 1. Anatomy of the FLIP Technique

1. **First**: Record initial bounding rect: `el.getBoundingClientRect()`.
2. **Last**: Apply the DOM change (e.g., append modal, toggle active class) and record final rect.
3. **Invert**: Calculate delta transforms (`dx = first.left - last.left`, `scaleX = first.width / last.width`) and apply inverted transform immediately so the element visually remains in its first position.
4. **Play**: Remove the transform with a smooth transition or Web Animations API call, letting the element glide to its new home at 60/120fps.

---

## 2. Zero-Dependency Shared Element Card-to-Modal Expansion

Morph an inline thumbnail card into a prominent full-page modal:

```javascript
export function morphCardToModal(cardEl, modalEl) {
  // 1. FIRST: Get initial card position
  const first = cardEl.getBoundingClientRect();

  // 2. LAST: Show modal in DOM (make active)
  modalEl.classList.add('is-open');
  const last = modalEl.getBoundingClientRect();

  // 3. INVERT: Calculate translation and scale offsets
  const deltaX = first.left - last.left;
  const deltaY = first.top - last.top;
  const deltaW = first.width / last.width;
  const deltaH = first.height / last.height;

  // Set transform origin to top-left for predictable matrix scaling
  modalEl.style.transformOrigin = 'top left';

  // 4. PLAY: Animate using native Web Animations API
  const animation = modalEl.animate([
    {
      transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${deltaW}, ${deltaH})`,
      borderRadius: window.getComputedStyle(cardEl).borderRadius
    },
    {
      transform: 'translate3d(0, 0, 0) scale(1, 1)',
      borderRadius: '16px'
    }
  ], {
    duration: 450,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Spring-like deceleration
    fill: 'both'
  });

  // Inverse scale for inner text to prevent visual squishing during animation
  const innerContent = modalEl.querySelector('.modal-content');
  if (innerContent) {
    innerContent.animate([
      { transform: `scale(${1 / deltaW}, ${1 / deltaH})` },
      { transform: 'scale(1, 1)' }
    ], {
      duration: 450,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    });
  }

  return animation;
}
```

---

## 3. Smooth Grid Item Reordering / Filter Transitions

When filtering portfolio items (e.g. "Design", "Code", "All"), items smoothly slide into their new grid slots instead of popping abruptly:

```javascript
export function flipReorder(container, updateDomFn) {
  const items = Array.from(container.children);

  // FIRST
  const firstRects = new Map();
  items.forEach(item => {
    firstRects.set(item, item.getBoundingClientRect());
  });

  // Apply DOM modifications (re-order or filter hidden)
  updateDomFn();

  // LAST & PLAY
  items.forEach(item => {
    const first = firstRects.get(item);
    const last = item.getBoundingClientRect();

    if (!first || (first.left === last.left && first.top === last.top)) return;

    // INVERT
    const dx = first.left - last.left;
    const dy = first.top - last.top;

    // PLAY
    item.animate([
      { transform: `translate3d(${dx}px, ${dy}px, 0)` },
      { transform: 'translate3d(0, 0, 0)' }
    ], {
      duration: 350,
      easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
    });
  });
}
```

---

## 4. Key Rules for FLIP Animations
- **Counter-Scaling**: Always apply inverse scaling `scale(1/deltaW, 1/deltaH)` to delicate content (typography, circular avatars) inside expanding containers to avoid aspect distortion.
- **Top-Left Origin**: Set `transform-origin: 0 0` on inverted elements so position math aligns with coordinate bounds.
- **Avoid Layout Reads in Loops**: Gather all `getBoundingClientRect()` measurements first in a batch before applying any styles to prevent layout thrashing.
