---
name: scrollytelling-cinematic-narrative
description: >-
  Apple-grade cinematic scrollytelling architectures. Use for canvas frame sequence scrubbing, multi-stage pinned viewports, 3D camera pan sequences, synchronized typography reveals, and narrative progress HUDs.
---

# Scrollytelling & Cinematic Web Narratives

## Overview
Scrollytelling unites interactive motion, longform narrative, and cinematic visual pacing. When executed with precision, scrolling becomes an active exploration rather than passive reading.

---

## 1. High-Performance Canvas Frame Sequence Scrubbing (Apple-Style)

Instead of sluggish video seeking, pre-render frames as compressed WebP/AVIF images and draw them to a 2D canvas based on normalized scroll progress:

```javascript
class FrameSequenceScrubber {
  constructor({ canvas, totalFrames, frameUrlTemplate, scrollContainer }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.totalFrames = totalFrames;
    this.frameUrlTemplate = frameUrlTemplate;
    this.scrollContainer = scrollContainer;
    this.images = [];
    this.currentFrame = 0;
    this.loadedCount = 0;

    this.preloadFrames();
    this.bindEvents();
  }

  preloadFrames() {
    for (let i = 1; i <= this.totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = this.frameUrlTemplate.replace('{index}', paddedIndex);
      img.onload = () => {
        this.loadedCount++;
        if (i === 1) this.renderFrame(0);
      };
      this.images.push(img);
    }
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      const rect = this.scrollContainer.getBoundingClientRect();
      const totalScroll = this.scrollContainer.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;
      
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      const targetFrame = Math.min(
        this.totalFrames - 1,
        Math.floor(progress * this.totalFrames)
      );

      if (targetFrame !== this.currentFrame && this.images[targetFrame]?.complete) {
        this.currentFrame = targetFrame;
        requestAnimationFrame(() => this.renderFrame(this.currentFrame));
      }
    }, { passive: true });
  }

  renderFrame(index) {
    const img = this.images[index];
    if (!img) return;

    // Aspect-ratio cover calculation
    const hRatio = this.canvas.width / img.width;
    const vRatio = this.canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShiftX = (this.canvas.width - img.width * ratio) / 2;
    const centerShiftY = (this.canvas.height - img.height * ratio) / 2;

    this.ctx.drawImage(
      img, 0, 0, img.width, img.height,
      centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
    );
  }
}
```

---

## 2. Multi-Stage Pinned Scrollytelling HTML Layout

```html
<section class="scrolly-section" style="height: 400vh;">
  <!-- Sticky Viewport Stage -->
  <div class="scrolly-stage">
    <canvas id="scrub-canvas"></canvas>

    <!-- Narrative Step Overlays (fade in/out based on scroll thresholds) -->
    <div class="scrolly-caption" data-step="0">
      <h2>The Genesis</h2>
      <p>Where ideas take their first geometric form.</p>
    </div>

    <div class="scrolly-caption" data-step="1">
      <h2>Internal Architecture</h2>
      <p>Precision-engineered down to the sub-pixel.</p>
    </div>

    <!-- Interactive Chapter HUD -->
    <div class="scrolly-hud">
      <div class="hud-progress-bar"></div>
      <span class="hud-counter">01 / 04</span>
    </div>
  </div>
</section>

<style>
.scrolly-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: grid;
  place-items: center;
}
#scrub-canvas {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}
.scrolly-caption {
  position: absolute;
  max-width: 480px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 400ms ease, transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.scrolly-caption.is-active {
  opacity: 1;
  transform: translateY(0);
}
</style>
```

---

## 3. Crucial Optimization & Memory Rules
- **Memory Footprint**: Keep total sequence size under 15MB. For a 120-frame animation, compress each WebP frame to ~80-120KB.
- **Progressive Downscaling**: Load half-resolution frames on mobile devices (`window.innerWidth < 768`).
- **prefers-reduced-motion**: Render a static key visual with a clean vertical scroll layout rather than sticky canvas locks.
