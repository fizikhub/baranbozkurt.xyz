---
trigger: always_on
description: Creative Design Manifesto, Animation Performance Standards, and Tactile UI/UX Rules for Baran Bozkurt's Workspace.
---

# Baran Bozkurt Creative Design & Engineering Manifesto

## 1. The Core Philosophy: "Software Should Feel Natural"
Every interface built in this workspace must feel tangible, organic, and crafted. Avoid sterile corporate AI templates, robotic stock layouts, and cookie-cutter design patterns. Honor the physical craft: notebook textures, linocut stamps, handwritten accents, warm typography, and analog tactility.

---

## 2. Animation & Motion Design Laws (60/120fps)
- **Composited Properties Only**: Animate strictly with `transform` and `opacity`. Never animate layout triggers (`width`, `height`, `margin`, `padding`, `top`, `left`) during continuous transitions or scroll scrubs.
- **The FLIP Mandate**: When dynamic layout repositioning is required (e.g. expanding cards, grid filtering), always use the FLIP technique (`flip-layout-animations-orchestration`).
- **Spring Physics over Linear Easing**: Real objects do not move at constant speed. Use spring-mass-damper dynamics or snappy deceleration curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Inclusive Accessibility**: Always wrap motion in `@media (prefers-reduced-motion: reduce)` fallbacks. Never trap users who suffer from vestibular disorders.

---

## 3. Originality & Visual Identity
- **Bold Editorial Typography**: Pair expressive humanist serifs (e.g. *Averia Serif Libre*) and tactile cursive scripts (e.g. *Gochi Hand*) with structured monospace accents (e.g. *JetBrains Mono*) and modern grotesque body text.
- **Generative & Procedural Flair**: Utilize GLSL shaders, Perlin flow fields, and interactive canvas constellation webs for bespoke, living visual environments rather than static stock imagery.
- **Neobrutal & Editorial Accents**: Incorporate hard-edged solid shadows (`box-shadow: 4px 4px 0 currentColor`), tilted stamp badges, paper cutouts, and asymmetrical broken grids.

---

## 4. Multisensory Tactile UI/UX
- **Zero-Asset Micro-Audio**: Leverage the native Web Audio API for whisper-soft procedural clicks, chimes, and spatial pans instead of heavy audio files.
- **Mobile Haptics**: Synchronize interaction milestones (rotary dials, toggles, success moments) with `navigator.vibrate` pulses.
- **Optical Balance**: Always calibrate padding and alignment optically rather than relying solely on geometric math.
