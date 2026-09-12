---
name: bento-grid-layout
description: >-
  Modern Bento Grid layout composition. Use for Apple-style asymmetric card grids, CSS Grid auto-placement with dense packing, visual hierarchy balancing, and interactive spotlight card borders.
---

# Bento Grid Editorial Layouts

## Overview
Bento Grids organize heterogeneous features into harmonious, asymmetrical compartments inspired by Japanese bento boxes, popularized by Apple and Linear.

## CSS Grid Bento Architecture
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .bento-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-flow: dense;
  }
  .bento-card-large {
    grid-column: span 2;
    grid-row: span 2;
  }
  .bento-card-wide {
    grid-column: span 2;
  }
  .bento-card-tall {
    grid-row: span 2;
  }
}
```

## Interactive Spotlight Border Effect
Tracking cursor coordinates to create an illuminated border gradient:
```javascript
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});
```
```css
.bento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255,255,255,0.15), transparent 40%);
  pointer-events: none;
}
```
