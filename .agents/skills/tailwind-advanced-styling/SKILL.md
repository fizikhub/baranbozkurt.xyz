---
name: tailwind-advanced-styling
description: >-
  Advanced Tailwind CSS engineering. Use for complex responsive layouts, arbitrary variants, group and peer state targeting, container queries, custom utility plugins, and dark mode configuration.
---

# Advanced Tailwind CSS Mastery

## Overview
Tailwind CSS provides low-level utility primitives that can be extended for complex micro-interactions, responsive states, and design token integration.

## 1. Group & Peer Modifiers for Relational UI
Trigger animations on nested or sibling elements based on parent state:
```html
<!-- Card with animated child icon on parent hover -->
<div class="group relative p-6 rounded-2xl bg-card border hover:border-primary/50 transition-all duration-300">
  <h3 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
    Explore Feature
  </h3>
  <span class="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
    &rarr;
  </span>
</div>

<!-- Peer modifier: change sibling styling based on checkbox/input state -->
<input type="checkbox" id="toggle" class="peer sr-only" />
<label for="toggle" class="w-12 h-6 bg-muted peer-checked:bg-primary rounded-full transition-colors cursor-pointer block relative">
  <span class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></span>
</label>
```

## 2. Container Query Utilities in Tailwind
```html
<div class="@container">
  <div class="flex flex-col @md:flex-row @lg:grid @lg:grid-cols-3 gap-4">
    <!-- Adapts based on card container width, not viewport! -->
  </div>
</div>
```

## 3. Best Practices
- Never use `@apply` everywhere; it defeats the purpose of utility-first CSS and increases CSS bundle size.
- Use `clsx` and `tailwind-merge` (`cn()` helper) to safely merge conditionally dynamic class names without specificity bugs.
