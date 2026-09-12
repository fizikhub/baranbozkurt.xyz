---
name: adaptive-navigation-patterns
description: >-
  Complex responsive navigation UX. Use for sticky smart-hiding headers, multi-level mega menus, mobile bottom navigation bars, off-canvas drawers, breadcrumbs, and scroll progress synchronization.
---

# Adaptive Navigation Systems

## Overview
Navigation is the compass of your user experience. It must stay accessible without hogging valuable vertical screen real estate.

## Smart Hiding Header Pattern (Scroll Direction Detection)
- Scroll Down: Hide header (`transform: translateY(-100%)`) to maximize content focus.
- Scroll Up: Instantly reveal header (`transform: translateY(0)`) assuming the user wants to navigate.
```javascript
let lastScrollY = window.scrollY;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  if (currentScrollY > lastScrollY && currentScrollY > 80) {
    header.classList.add('nav-hidden');
  } else {
    header.classList.remove('nav-hidden');
  }
  lastScrollY = currentScrollY;
}, { passive: true });
```

## Mobile Navigation Patterns
- On mobile, replace horizontal nav links with a **Sticky Bottom Navigation Bar** for 3-5 primary destinations.
- Use an accessible off-canvas drawer with focus trapping for extended secondary menus.
