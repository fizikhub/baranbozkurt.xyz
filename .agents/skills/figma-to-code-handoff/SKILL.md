---
name: figma-to-code-handoff
description: >-
  Pixel-perfect Figma to production code translation. Use for converting Figma auto-layouts to Flexbox/Grid, reading layout constraints, extracting typography/spacing variables, and maintaining design fidelity.
---

# Figma to Code Handoff & Translation

## Overview
Bridging Figma design files and production code requires mapping Figma's mental model into clean, semantic, responsive HTML/CSS.

## Auto-Layout to CSS Mapping Rules
1. **Direction**: Auto-layout Horizontal -> `flex-direction: row;` / Vertical -> `flex-direction: column;`
2. **Gap**: Figma Spacing -> `gap: ${n}px;`
3. **Resizing**:
   - `Hug Contents` -> `width: fit-content;` or `w-auto`
   - `Fill Container` -> `flex: 1 1 0%; width: 100%;` or `flex-1`
   - `Fixed` -> explicit width/height
4. **Padding**: Individual box model padding values mapped to CSS shorthand.

## Vector Asset Extraction Checklist
- Strip unnecessary empty groups and clipping paths in Figma before export.
- Always export as SVG with `id` attribute prefixes disabled to prevent duplicate ID conflicts across pages.
