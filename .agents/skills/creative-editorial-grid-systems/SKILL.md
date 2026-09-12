---
name: creative-editorial-grid-systems
description: >-
  Avant-garde editorial layout architectures and broken CSS Grid systems. Use for magazine-style asymmetrical pacing, overlapping multi-layer compositions, CSS Subgrid alignment across nested cards, and non-standard responsive column rhythm.
---

# Creative Editorial Grid Systems & Broken Layouts

## Overview
Standard 12-column frameworks produce repetitive, predictable websites. Creative editorial grid architectures break out of the box using overlapping grid coordinates, asymmetrical rhythm, multi-axis whitespace, and native CSS Subgrid to achieve the tactile, high-art feel of independent printed magazines.

---

## 1. Asymmetrical Overlapping Poster Grid (CSS Grid)

Create layered, magazine-style collages where imagery, typography, and stamp badges intentionally overlap across shared grid lines:

```css
.editorial-collage {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(80px, auto);
  gap: 1.5rem;
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
}

/* Hero Feature Image */
.collage-hero-media {
  grid-column: 1 / 8;
  grid-row: 1 / 6;
  z-index: 1;
}

.collage-hero-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

/* Overlapping Title Banner spanning across the image */
.collage-floating-title {
  grid-column: 6 / 13;
  grid-row: 4 / 7;
  z-index: 2;
  background: #fdfbf7;
  padding: 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.12);
  align-self: center;
}

/* Secondary Editorial Callout */
.collage-aside-note {
  grid-column: 2 / 5;
  grid-row: 6 / 8;
  z-index: 3;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  color: #71717a;
  border-left: 2px solid #e35342;
  padding-left: 1rem;
}
```

---

## 2. Perfect Subgrid Alignment Across Nested Cards

CSS `subgrid` lets child elements align to the parent grid lines, ensuring titles, descriptions, and action buttons align horizontally across cards with varying content heights:

```css
.card-matrix {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.matrix-card {
  display: grid;
  /* Child inherits parent's vertical rhythm */
  grid-template-rows: subgrid;
  grid-row: span 3; /* Spans: Image, Headline, Metadata footer */
  background: white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e4e4e7;
}

.matrix-card-image {
  height: 220px;
  object-fit: cover;
}

.matrix-card-heading {
  padding: 1.25rem 1.5rem 0.5rem;
  font-family: 'Averia Serif Libre', serif;
  font-size: 1.5rem;
}

.matrix-card-footer {
  padding: 0 1.5rem 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  color: #71717a;
  align-self: end;
}
```

---

## 3. High-Pacing Editorial Breakouts

Break out of the standard container constraint to full-bleed viewport margins:

```css
.editorial-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Escapes container to full bleed */
.bleed-full {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Escapes container to wide breakout */
.bleed-wide {
  width: min(100vw - 3rem, 1140px);
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
```

---

## 4. Responsive Editorial Collapse Strategies
- **On Mobile (< 768px)**: Collapse 12-column overlaps into a stacked single column with subtle overlap cues (-1.5rem negative margin) to preserve the layered collaged feel without text clipping.
- **Visual Center vs Geometric Center**: In asymmetric grids, optically adjust headline padding so text visually anchors with the reading eye rather than strictly mathematical centers.
