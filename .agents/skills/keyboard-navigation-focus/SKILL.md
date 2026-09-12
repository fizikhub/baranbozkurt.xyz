---
name: keyboard-navigation-focus
description: >-
  Keyboard accessibility and focus management. Use for visible :focus-visible rings, skip links ('Skip to content'), roving tabindex, managing focus traps in dialogs, and keyboard navigation shortcuts.
---

# Keyboard Navigation & Focus Management

## Overview
Many power users and users with motor disabilities navigate exclusively via keyboard (`Tab`, `Shift+Tab`, `Space`, `Enter`, `Escape`, `Arrow Keys`).

## 1. Non-Negotiable: `:focus-visible` Rings
Never set `outline: none` without providing an accessible alternative:
```css
:focus:not(:focus-visible) {
  outline: none; /* Suppresses ring on mouse click */
}

:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2);
}
```

## 2. Skip to Content Link
Provide a jump mechanism at the very beginning of the document:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```
```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 16px;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  z-index: 9999;
  transition: top 150ms ease;
}
.skip-link:focus {
  top: 16px;
}
```

## 3. Roving Tabindex
Used in toolbars, menus, and grid cells so `Tab` exits the group, while `Arrow Keys` move focus inside the group.
