---
name: generative-canvas-creative-coding
description: >-
  Algorithmic generative art and creative coding with HTML5 Canvas. Use for Perlin flow fields, Voronoi diagrams, Reynolds flocking (Boids), organic cellular networks, and particle constellations that react to pointer touch.
---

# Generative Canvas & Creative Coding

## Overview
Generative art brings algorithmic unpredictability and procedural beauty to web design. Rather than static background assets, generative systems compute living visual forms in real-time, reacting subtly to visitor interactions.

---

## 1. High-Performance Perlin Flow Field with Particle Trails

Flow fields use noise matrices to direct hundreds of wandering particles, creating silky, organic vector trails:

```javascript
export class FlowField {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
    this.scale = 20; // Grid resolution
    this.cols = Math.floor(this.width / this.scale);
    this.rows = Math.floor(this.height / this.scale);
    this.particles = [];
    this.numParticles = 600;
    this.zOff = 0; // Time dimension for noise evolution

    this.initParticles();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initParticles() {
    for (let i = 0; i < this.numParticles; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: 0,
        vy: 0,
        prevX: 0,
        prevY: 0,
        speed: 1.5 + Math.random() * 1.5
      });
    }
  }

  // Simplified pseudo 2D Perlin noise generator
  noise(x, y, z) {
    return Math.sin(x * 0.05 + z) * Math.cos(y * 0.05 + z);
  }

  animate() {
    // Semi-transparent overlay creates smooth fading motion trails
    this.ctx.fillStyle = 'rgba(18, 18, 18, 0.04)';
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = '#e35342';
    this.ctx.lineWidth = 1;

    for (let p of this.particles) {
      p.prevX = p.x;
      p.prevY = p.y;

      // Sample angle from noise field
      const angle = this.noise(p.x / this.scale, p.y / this.scale, this.zOff) * Math.PI * 2;
      p.vx = Math.cos(angle) * p.speed;
      p.vy = Math.sin(angle) * p.speed;

      p.x += p.vx;
      p.y += p.vy;

      // Wrap boundaries
      if (p.x < 0) p.x = p.prevX = this.width;
      if (p.x > this.width) p.x = p.prevX = 0;
      if (p.y < 0) p.y = p.prevY = this.height;
      if (p.y > this.height) p.y = p.prevY = 0;

      // Draw line segment
      this.ctx.beginPath();
      this.ctx.moveTo(p.prevX, p.prevY);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
    }

    this.zOff += 0.003;
    requestAnimationFrame(this.animate);
  }
}
```

---

## 2. Interactive Constellation Network (Pointer Proximity Web)

Interactive node graphs connect with dynamic alpha lines when particles are within proximity to each other or the user's cursor:

```javascript
export function initConstellation(canvas) {
  const ctx = canvas.getContext('2d');
  const nodes = [];
  const count = 75;
  const maxDist = 120;
  const mouse = { x: -9999, y: -9999 };

  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: 1.5 + Math.random() * 2
    });
  }

  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < count; i++) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;

      if (a.x < 0 || a.x > canvas.width) a.vx *= -1;
      if (a.y < 0 || a.y > canvas.height) a.vy *= -1;

      // Draw node point
      ctx.fillStyle = '#fdfbf7';
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby nodes
      for (let j = i + 1; j < count; j++) {
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.strokeStyle = `rgba(227, 83, 66, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Connect to mouse
      const mouseDist = Math.hypot(a.x - mouse.x, a.y - mouse.y);
      if (mouseDist < 160) {
        const alpha = (1 - mouseDist / 160) * 0.5;
        ctx.strokeStyle = `rgba(240, 165, 0, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}
```

---

## 3. Performance & Craft Best Practices
- **Batch Path Calls**: Call `ctx.beginPath()` and `ctx.stroke()` once for multiple lines of the same color instead of once per line.
- **Typed Arrays**: Use `Float32Array` for large particle counts (>1000) for CPU cache efficiency.
- **Visibility Detection**: Halt animation loops when tab is in the background (`document.hidden`).
