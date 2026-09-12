---
name: neobrutalism-editorial-design
description: >-
  Neobrutalism and avant-garde editorial web styling. Use for hard-edge drop shadows (box-shadow 4px 4px 0), bold asymmetric typography, risograph textures, raw sticker badges, retro-modern color contrasts, and print-inspired editorial layouts.
---

# Neobrutalism & Editorial Avant-Garde Design

## Overview
Neobrutalism rejects the homogenized, sterile "tech startup" aesthetic. It embraces high-contrast borders, solid unblurred shadows, raw typography, asymmetrical poster grids, and physical paper-like textures (stickers, tape, linocuts) to inject unmistakable identity and cultural character.

---

## 1. Core Neobrutalist Design Tokens & Shadows

```css
:root {
  --neo-border-width: 3px;
  --neo-border-color: #121212;
  --neo-shadow-x: 5px;
  --neo-shadow-y: 5px;
  --neo-shadow-color: #121212;
  --neo-shadow: var(--neo-shadow-x) var(--neo-shadow-y) 0 var(--neo-shadow-color);
  
  /* High-voltage color palette */
  --neo-bg-canvas: #fbf7ee;
  --neo-accent-coral: #e35342;
  --neo-accent-yellow: #f8d030;
  --neo-accent-cobalt: #1e3a8a;
}

/* Card with hard shadow */
.neo-card {
  background: #ffffff;
  border: var(--neo-border-width) solid var(--neo-border-color);
  border-radius: 4px;
  box-shadow: var(--neo-shadow);
  padding: 1.5rem;
  transition: transform 120ms ease, box-shadow 120ms ease;
}

/* Tactile pushdown click interaction */
.neo-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  background: var(--neo-accent-yellow);
  color: var(--neo-border-color);
  border: var(--neo-border-width) solid var(--neo-border-color);
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  box-shadow: var(--neo-shadow);
  cursor: pointer;
  user-select: none;
  transition: transform 80ms ease, box-shadow 80ms ease;
}

.neo-button:hover {
  transform: translate(-2px, -2px);
  box-shadow: calc(var(--neo-shadow-x) + 2px) calc(var(--neo-shadow-y) + 2px) 0 var(--neo-border-color);
}

.neo-button:active {
  transform: translate(var(--neo-shadow-x), var(--neo-shadow-y));
  box-shadow: 0 0 0 var(--neo-border-color);
}
```

---

## 2. Editorial Paper Accents: Stickers, Stamps & Tape

```css
/* Tilted sticker badge */
.neo-sticker {
  display: inline-block;
  font-family: 'Gochi Hand', cursive, sans-serif;
  font-size: 1.1rem;
  background: var(--neo-accent-coral);
  color: white;
  padding: 0.35rem 0.85rem;
  border: 2px solid #121212;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px; /* Organic hand-cut look */
  box-shadow: 3px 3px 0 #121212;
  transform: rotate(-3deg);
  transition: transform 200ms ease;
}

.neo-sticker:hover {
  transform: rotate(2deg) scale(1.05);
}

/* Masking tape strip holding an element */
.neo-tape {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%) rotate(-1.5deg);
  width: 90px;
  height: 24px;
  background: rgba(235, 230, 215, 0.85);
  border-left: 2px dashed rgba(18, 18, 18, 0.2);
  border-right: 2px dashed rgba(18, 18, 18, 0.2);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 2;
}
```

---

## 3. High-Contrast Monospace / Serif Editorial Lockups

Mix utilitarian monospace technical annotations with warm, humanist editorial serifs:

```html
<article class="editorial-entry">
  <div class="meta-strip">
    <span class="entry-index">REF #042</span>
    <span class="entry-date">EST. 2026 // ISTANBUL</span>
  </div>
  <h2 class="editorial-headline">
    The Anatomy of <em>Natural</em> Software
  </h2>
  <p class="editorial-lede">
    Moving away from slick corporate glass towards tactile paper, ink, and authentic craftsmanship.
  </p>
</article>

<style>
.meta-strip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #71717a;
  margin-bottom: 0.5rem;
}
.editorial-headline {
  font-family: 'Averia Serif Libre', serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  line-height: 1.1;
  color: #18181b;
}
.editorial-headline em {
  font-style: italic;
  text-decoration: underline wavy var(--neo-accent-coral);
}
</style>
```

---

## 4. Accessibility & Anti-Fatigue Rules
- Ensure text on colored badges meets WCAG AAA (minimum 7:1 for body, 4.5:1 for headings).
- Maintain generous whitespace (`gap: 2rem` to `3rem`) to balance the high-density border weights.
- Do not overuse rotating angles; keep tilt variations within -4deg to +4deg to maintain reading ergonomics.
