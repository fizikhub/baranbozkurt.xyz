---
name: mobile-first-touch-gestures
description: >-
  Mobile touch UX and ergonomic gesture engineering. Use for bottom sheets, swipe-to-dismiss, pull-to-refresh, thumb-zone ergonomics, and meeting minimum touch target sizing (44x44px, 48x48px).
---

# Mobile First Touch Gestures & Ergonomics

## Overview
Over 60% of web traffic originates from touch devices. Desktop hover states do not exist on touch; interfaces must rely on tactile tap responses and natural swipe gestures.

## The Thumb Zone Rule
- **Easy Zone (Bottom Screen)**: Primary actions, tabs, submission buttons, bottom sheets.
- **Stretch Zone (Middle Screen)**: Content, cards, scrollable feeds.
- **Hard Zone (Top Screen)**: Secondary info, back button, logo.

## Touch Target Standards (WCAG 2.5.5 / 2.5.8)
- Minimum touch target size: **44x44 CSS pixels** (Apple HIG) or **48x48px** (Google Material).
- If an icon is visually 20x20px, expand its clickable tap area using padding:
```css
.tap-target {
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  touch-action: manipulation; /* Disables double-tap zoom delay */
}
```

## Pull-to-Refresh & Overscroll Behavior
Prevent rubber-banding interference with `overscroll-behavior-y: contain;` on modal/scroll containers.
