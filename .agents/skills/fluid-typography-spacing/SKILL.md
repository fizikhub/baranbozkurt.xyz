---
name: fluid-typography-spacing
description: >-
  Dynamic fluid typography and responsive spacing scales using CSS clamp(). Use to create mathematically fluid typography that scales seamlessly across all screen resolutions without brittle media query jumps.
---

# Fluid Typography & Responsive Spacing

## Overview
Fluid typography uses CSS `clamp()` to interpolate font sizes smoothly between a minimum viewport width (e.g. mobile 375px) and a maximum viewport width (e.g. desktop 1440px).

## The Mathematical Clamp Formula
`clamp(MIN, PREFERRED_VAL_VW, MAX)`

```css
:root {
  /* Fluid Typographic Scale */
  --text-xs: clamp(0.75rem, 0.72rem + 0.15vw, 0.85rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.15rem, 1.05rem + 0.5vw, 1.35rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
  --text-4xl: clamp(2rem, 1.6rem + 2vw, 3rem);
  --text-display: clamp(2.5rem, 1.8rem + 3.5vw, 4.75rem);

  /* Fluid Spacing Scale */
  --space-gutter: clamp(16px, 4vw, 64px);
  --space-section: clamp(48px, 8vw, 128px);
}

h1.hero-title {
  font-size: var(--text-display);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

section.page-section {
  padding-block: var(--space-section);
  padding-inline: var(--space-gutter);
}
```

## Key Rules
- **Line Heights**: Display headings need tighter line heights (1.05 - 1.15), while body text requires comfortable reading space (1.5 - 1.6).
- Always ensure font sizes can be zoomed up to 200% by browser settings without clipping or breaking container overflow (WCAG 1.4.4).
