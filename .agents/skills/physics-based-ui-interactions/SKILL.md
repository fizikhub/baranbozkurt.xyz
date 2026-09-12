---
name: physics-based-ui-interactions
description: >-
  Real-time 2D/3D physics engines and tactile spring simulations for UI. Use for Matter.js rigid-body elements, draggable momentum throw-and-catch cards, bouncy collisions, gravity tumble containers, and spring-mass-damper dynamics.
---

# Physics-Based UI & Dynamic Interactions

## Overview
Physics-based interfaces obey natural laws of inertia, momentum, friction, and restitution (bounciness). Instead of fixed duration linear or cubic animations, elements feel like physical objects that can be flicked, dragged, caught, or dropped.

---

## 1. Lightweight Spring-Mass-Damper Solver (Zero Library Dependency)

For individual elements (modals, tooltips, tags), a pure mathematical spring solver is lighter and more realistic than CSS transitions:

```javascript
class Spring {
  constructor({ stiffness = 180, damping = 12, mass = 1 } = {}) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
    this.current = 0;
    this.target = 0;
    this.velocity = 0;
  }

  update(dt = 1 / 60) {
    const springForce = -this.stiffness * (this.current - this.target);
    const dampingForce = -this.damping * this.velocity;
    const acceleration = (springForce + dampingForce) / this.mass;

    this.velocity += acceleration * dt;
    this.current += this.velocity * dt;

    // Check if settled
    const isSettled = Math.abs(this.velocity) < 0.001 && Math.abs(this.current - this.target) < 0.001;
    if (isSettled) {
      this.current = this.target;
      this.velocity = 0;
    }
    return !isSettled;
  }
}
```

---

## 2. Draggable Card with Momentum Throw & Angular Inertia

When released, continue motion with decaying velocity and tilt based on drag speed:

```javascript
function makeThrowableCard(el) {
  let isDragging = false;
  let startX = 0, startY = 0;
  let posX = 0, posY = 0;
  let velX = 0, velY = 0;
  let lastTime = 0, lastX = 0, lastY = 0;
  let animId = null;

  el.addEventListener('pointerdown', (e) => {
    isDragging = true;
    el.setPointerCapture(e.pointerId);
    cancelAnimationFrame(animId);

    startX = e.clientX - posX;
    startY = e.clientY - posY;
    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = performance.now();
    el.style.cursor = 'grabbing';
  });

  el.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max((now - lastTime) / 1000, 0.001);

    posX = e.clientX - startX;
    posY = e.clientY - startY;

    // Compute velocity for inertia
    velX = (e.clientX - lastX) / dt;
    velY = (e.clientY - lastY) / dt;

    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;

    // Tilt proportional to horizontal drag speed
    const rot = Math.max(Math.min(velX * 0.02, 25), -25);
    el.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${rot}deg)`;
  });

  el.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    el.style.cursor = 'grab';

    // Inertia decay loop
    function glide() {
      velX *= 0.92; // Friction damping
      velY *= 0.92;
      posX += velX * 0.016;
      posY += velY * 0.016;

      const rot = Math.max(Math.min(velX * 0.015, 20), -20);
      el.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${rot}deg)`;

      if (Math.hypot(velX, velY) > 5) {
        animId = requestAnimationFrame(glide);
      }
    }
    glide();
  });
}
```

---

## 3. Matter.js Interactive Tag Drop Container

Create interactive pill tags or badges that drop into a bounding box with realistic collisions:

```javascript
import Matter from 'matter-js';

export function createGravityTags(containerEl, tagLabels) {
  const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

  const width = containerEl.clientWidth;
  const height = containerEl.clientHeight;

  const engine = Engine.create({ gravity: { x: 0, y: 0.8 } });
  const render = Render.create({
    element: containerEl,
    engine: engine,
    options: {
      width,
      height,
      wireframes: false,
      background: 'transparent'
    }
  });

  // Create floor and boundaries
  const ground = Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true });
  const wallLeft = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
  const wallRight = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });

  // Add tag bodies with rounded corners
  const tagBodies = tagLabels.map((text, i) => {
    const x = width * 0.2 + (i * 40) % (width * 0.6);
    const y = -50 - (i * 60);
    return Bodies.rectangle(x, y, text.length * 12 + 24, 38, {
      chamfer: { radius: 19 },
      restitution: 0.6, // Bounciness
      friction: 0.1,
      render: { fillStyle: '#18181b', strokeStyle: '#3f3f46', lineWidth: 1.5 }
    });
  });

  Composite.add(engine.world, [ground, wallLeft, wallRight, ...tagBodies]);

  // Mouse drag constraint
  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } }
  });
  Composite.add(engine.world, mouseConstraint);

  Runner.run(Runner.create(), engine);
  Render.run(render);
}
```

---

## 4. Key Performance & UX Principles
- **Throttle Physics off-screen**: Always pause physics simulations when elements are scrolled out of view (`IntersectionObserver`).
- **Boundaries & Catch-Zones**: Constrain throwable elements to stay within screen boundaries or snap back if thrown into the void.
- **Hardware Acceleration**: Always use `transform: translate3d()` to ensure composited GPU acceleration.
- **Fallbacks**: Provide clean CSS flex/grid layout fallback for users with `prefers-reduced-motion: reduce`.
