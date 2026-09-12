---
name: rive-lottie-runtime
description: >-
  Vector animation runtime integration using Rive and Lottie. Use when embedding lightweight, resolution-independent vector illustrations, interactive state machines, bone-rigged icons, and character animations.
---

# Rive & Lottie Vector Runtimes

## Overview
Rive and Lottie enable vector-based UI animations that scale crisply to any resolution with tiny file sizes compared to GIFs or MP4 videos.

## Choosing Rive vs Lottie
- **Lottie**: Best for pre-rendered, linear vector motion (AE Bodymovin exports, icon toggles, loading spinners).
- **Rive**: Best for interactive state machines, real-time mouse tracking, gaming UI, and dynamic user inputs.

## Rive Integration Pattern
```html
<canvas id="rive-canvas" width="400" height="400"></canvas>
<script src="https://unpkg.com/@rive-app/canvas@latest"></script>
<script>
  const r = new rive.Rive({
    src: '/assets/animations/hero.riv',
    canvas: document.getElementById('rive-canvas'),
    autoplay: true,
    stateMachines: 'State Machine 1',
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
      const inputs = r.stateMachineInputs('State Machine 1');
      const triggerSuccess = inputs.find(i => i.name === 'isSuccess');
      // triggerSuccess.fire();
    }
  });
</script>
```

## Lottie Web Best Practices
- Render with `renderer: 'svg'` for crisp lines or `'canvas'` if animating 50+ elements simultaneously.
- Freeze animations when out of viewport using `IntersectionObserver` to preserve battery.
