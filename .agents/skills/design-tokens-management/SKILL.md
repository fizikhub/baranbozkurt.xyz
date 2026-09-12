---
name: design-tokens-management
description: >-
  Structuring, maintaining, and scaling design tokens. Use when establishing W3C DTCG format tokens, CSS variables, Style Dictionary pipelines, multi-brand themes, and bridging Figma design tokens to code.
---

# Design Tokens & Multi-Theme Systems

## Overview
Design tokens are the atomic visual atoms (colors, spacing, typography, radii, elevation) stored in an agnostic format (JSON/YAML) and transformed into platform-specific variables (CSS, iOS Swift, Android XML).

## Semantic Token Architecture
Never use raw values or purely literal tokens in components. Use a 3-tier hierarchy:
1. **Global/Reference**: `--color-blue-500: #3b82f6;`
2. **Semantic/System**: `--bg-surface-interactive: var(--color-blue-500);`
3. **Component-Specific**: `--btn-primary-bg: var(--bg-surface-interactive);`

## W3C DTCG Standard Example (`tokens.json`)
```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#4f46e5",
        "$type": "color"
      }
    },
    "surface": {
      "default": {
        "$value": "{color.brand.primary}",
        "$type": "color"
      }
    }
  }
}
```

## CSS Variable Export Strategy
```css
:root {
  --space-unit: 4px;
  --space-1: calc(var(--space-unit) * 1); /* 4px */
  --space-2: calc(var(--space-unit) * 2); /* 8px */
  --space-4: calc(var(--space-unit) * 4); /* 16px */
  --space-8: calc(var(--space-unit) * 8); /* 32px */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```
