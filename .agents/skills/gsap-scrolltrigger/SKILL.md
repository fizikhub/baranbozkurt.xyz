---
name: gsap-scrolltrigger
description: >-
  Professional web animation engineering with GSAP (GreenSock) and ScrollTrigger. Use when building complex timeline choreography, scroll scrubbers, pinning sections, SVG morphing, and canvas animation pipelines.
---

# GSAP & ScrollTrigger Engineering

## Overview
GSAP is the gold standard for high-performance timeline sequencing and scroll-driven experiences. ScrollTrigger links timeline progress to viewport scrolling.

## Key Architecture

### 1. Robust Lifecycle in Modern Frameworks (React/Vue/Vanilla)
Always clean up timelines to prevent memory leaks and duplicate triggers:
```javascript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// React example using gsap.context
useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".feature-section",
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.from(".feature-card", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(".feature-bg", { scale: 1.2, ease: "none" }, 0);
  });

  return () => ctx.revert(); // Essential cleanup!
}, []);
```

### 2. Smooth Scrubbing & Staggering
- Use numerical scrub (e.g. `scrub: 1` or `scrub: 0.5`) to add fluid momentum smoothing rather than direct `scrub: true`.
- Use `gsap.matchMedia()` for responsive animations:
```javascript
const mm = gsap.matchMedia();
mm.add("(min-width: 800px)", () => {
  // Desktop pin animations
});
mm.add("(max-width: 799px)", () => {
  // Mobile simplified layout animations
});
```

### Best Practices
- Never animate non-composited properties in scrubbed scroll triggers (`width`, `height`, `border`).
- Set `willChange: "transform, opacity"` on active animated elements during animation and remove after.
- When page content loads dynamically or fonts load, call `ScrollTrigger.refresh()`.
