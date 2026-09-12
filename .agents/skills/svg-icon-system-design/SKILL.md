---
name: svg-icon-system-design
description: >-
  Scalable SVG icon systems and vector assets. Use for building icon sprite sheets, dynamic currentColor inheritance, non-scaling stroke vectors, accessible SVG markup, and SVGO asset optimization pipelines.
---

# SVG Icon Systems & Vector Engineering

## Overview
Icons communicate meaning instantly and establish visual rhythm. A poorly configured SVG icon system causes rendering blurs, broken dark mode colors, and layout shifts.

## 1. Universal Vector Icon Template
```html
<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  width="24" 
  height="24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round"
  aria-hidden="true" 
  focusable="false"
  class="icon"
>
  <path d="M5 12h14M12 5l7 7-7 7" />
</svg>
```

## Core Engineering Rules
1. **`currentColor` Inheritance**: Hardcode neither `fill` nor `stroke` colors inside the SVG. Use `currentColor` so the icon automatically matches parent text color and dark/light themes.
2. **Accessible Labeling**:
   - Decorative icons must have `aria-hidden="true"`.
   - Standalone icon buttons must have `aria-label="Description"` on the button parent.
3. **Pixel Grid Snapping**: Always design icons on an integer grid (16x16, 20x20, 24x24) and align stroke vertices to exact pixels to eliminate blurry anti-aliasing.
