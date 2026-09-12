---
name: container-queries-responsive
description: >-
  Component-level responsiveness with CSS Container Queries (@container). Use for designing modular, plug-and-play components that adapt their layout based on their parent container size rather than viewport size.
---

# CSS Container Queries (@container)

## Overview
Viewport media queries (`@media (min-width: ...)` ) break component modularity because a component doesn't know whether it is rendered in a full-width hero, a narrow sidebar, or a multi-column grid. `@container` solves this.

## Implementation Guide
```css
/* 1. Define container context on parent card wrapper */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* 2. Default mobile / narrow layout inside container */
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 3. Container query: adapts when the container itself is wider than 400px */
@container card (min-width: 400px) {
  .profile-card {
    flex-direction: row;
    align-items: center;
  }
  .profile-avatar {
    width: 64px;
    height: 64px;
  }
}
```

## Key Advantage
The exact same `.profile-card` component will display as a horizontal banner in the main content area, but seamlessly collapse into a vertical card when placed in a sidebar!
