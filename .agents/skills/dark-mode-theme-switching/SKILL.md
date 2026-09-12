---
name: dark-mode-theme-switching
description: >-
  Production dark mode and theme switching systems. Use for eliminating flash of unstyled content (FOUC), synchronizing with prefers-color-scheme, CSS variable token remapping, and smooth theme transitions.
---

# FOUC-Free Dark Mode Architecture

## Overview
Dark mode reduces eye strain in low-light environments and preserves battery on OLED displays. A flawed implementation causes jarring white flashes (FOUC) on page load.

## The Zero-FOUC Inline Head Script
Place this script directly inside `<head>` before any stylesheets or DOM elements render:
```html
<script>
  (function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme ? savedTheme : (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') document.documentElement.classList.add('dark');
  })();
</script>
```

## Avoiding Transition Flashes During Theme Toggle
Disable animations momentarily when toggling themes to prevent all elements from animating their background colors simultaneously:
```javascript
function toggleTheme() {
  document.documentElement.classList.add('no-transitions');
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('no-transitions');
  });
}
```
```css
.no-transitions * {
  transition: none !important;
}
```
