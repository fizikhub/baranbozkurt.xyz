---
name: internationalization-rtl-ux
description: >-
  Right-to-Left (RTL) layout engineering and bidirectional UX. Use for Arabic, Hebrew, and Persian layouts, CSS Logical Properties (margin-inline, padding-block), dir='rtl' adaptations, and mirrored icon logic.
---

# Internationalization & Right-to-Left (RTL) UX

## Overview
Over 300 million people read right-to-left (Arabic, Hebrew, Persian, Urdu). Building with physical properties (`left`, `right`) forces dual stylesheets; CSS Logical Properties fix this natively.

## CSS Logical Properties Replacement Guide
| Physical Property (Avoid) | Modern Logical Property (Use) |
|---|---|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-top` | `padding-block-start` |
| `padding-bottom` | `padding-block-end` |
| `left: 0;` | `inset-inline-start: 0;` |
| `right: 0;` | `inset-inline-end: 0;` |
| `text-align: left;` | `text-align: start;` |

## Icon Mirroring in RTL
Certain directional icons must mirror in RTL (e.g. forward arrows, back buttons, undo/redo):
```css
[dir="rtl"] .icon-directional {
  transform: scaleX(-1);
}
```
*Note: Do not mirror media playback controls (play/pause) or clocks.*
