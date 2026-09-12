---
name: color-palette-engineering
description: >-
  Modern color systems using OKLCH and OKLAB color spaces. Use for perceptually uniform color gradients, accessible high-contrast palettes, APCA / WCAG 3.0 compliance, and dynamic dark/light theme tokens.
---

# OKLCH Color Palette Engineering

## Overview
Traditional sRGB and HSL color spaces suffer from perceptual non-uniformity: yellow at 50% lightness looks blindingly bright, while blue at 50% lightness looks dark. OKLCH fixes this with true perceptual lightness (`L`), chroma (`C`), and hue (`H`).

## Modern OKLCH Palette Structure
```css
:root {
  /* OKLCH: L (0-100%), C (0-0.4), H (0-360 deg) */
  --color-brand-primary: oklch(62% 0.24 265);
  --color-brand-hover:   oklch(56% 0.24 265);
  --color-brand-active:  oklch(48% 0.24 265);
  --color-brand-surface: oklch(96% 0.03 265);

  /* Semantic Neutral Surfaces */
  --bg-canvas:  oklch(99% 0.002 265);
  --bg-surface: oklch(96% 0.006 265);
  --text-primary: oklch(20% 0.02 265);
  --text-muted:   oklch(50% 0.02 265);
}

[data-theme="dark"] {
  --bg-canvas:  oklch(14% 0.01 265);
  --bg-surface: oklch(19% 0.015 265);
  --text-primary: oklch(98% 0.005 265);
  --text-muted:   oklch(70% 0.015 265);
}
```

## Why OKLCH Elevates UI
- **Smooth Gradients**: No gray dead-zones in the middle of gradients when transitioning across color hues.
- **Predictable Contrast**: Two colors with the same `L` difference have identical perceived contrast regardless of hue.
- **Dynamic Theming**: You can adjust hue (`H`) across the entire brand while preserving lightness contrast ratios.
