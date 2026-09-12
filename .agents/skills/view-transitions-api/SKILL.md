---
name: view-transitions-api
description: >-
  Seamless multi-page and single-page animated view transitions. Use for morphing shared layout elements, hero image expansions, smooth page route navigation, and native app-like page transitions.
---

# View Transitions API

## Overview
The View Transitions API provides native browser support for animating between DOM states or different HTML documents without complex manual FLIP calculations.

## Single Page App (SPA) Transition
```javascript
function navigateToCard(cardId) {
  // Fallback for older browsers
  if (!document.startViewTransition) {
    updateDOM(cardId);
    return;
  }

  // Tells browser to capture old state, apply DOM change, capture new state, and animate
  document.startViewTransition(() => {
    updateDOM(cardId);
  });
}
```

## Shared Element Transitions with CSS
Tag corresponding elements on both screens with a matching `view-transition-name`:
```css
/* Source card thumbnail */
.card-thumb {
  view-transition-name: hero-image;
}

/* Destination full-page header */
.detail-hero {
  view-transition-name: hero-image;
}

/* Customizing the morph animation */
::view-transition-old(hero-image),
::view-transition-new(hero-image) {
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Progressive Enhancement Rule
Always test with `@supports (view-transition-name: none)` and ensure your app functions cleanly even without transition effects.
