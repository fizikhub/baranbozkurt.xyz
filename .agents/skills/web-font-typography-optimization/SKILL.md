---
name: web-font-typography-optimization
description: >-
  Web font performance and typographic refinement. Use for variable font axes (wght, wdth, ital), FOUT/FOIT elimination, font-display: swap, preload strategies, and size-adjust metric overrides.
---

# Web Font Typography Optimization

## Overview
Fonts establish editorial voice, but improper loading causes Flash of Invisible Text (FOIT), Flash of Unstyled Text (FOUT), and severe Cumulative Layout Shift (CLS).

## 1. Preloading Critical Fonts
```html
<link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin />
```

## 2. Modern Variable Font Declaration
```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-VariableFont_slnt,wght.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-style: oblique 0deg 10deg;
  font-display: swap;
}
```

## 3. Metric Overrides to Eliminate CLS
Use `@font-face` metric overrides on fallback system fonts so they take up the exact same physical space as your web font while loading:
```css
@font-face {
  font-family: 'Fallback-Inter';
  src: local('Arial');
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
  size-adjust: 107%;
}
```
