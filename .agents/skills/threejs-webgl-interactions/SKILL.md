---
name: threejs-webgl-interactions
description: >-
  Interactive 3D graphics, WebGL experiences, and Three.js canvas integrations. Use when building interactive 3D hero sections, particle meshes, procedural shaders, camera panning, and 3D product visualizers.
---

# Three.js & WebGL Interactive Design

## Overview
Interactive 3D WebGL elevates brand aesthetics, product visualization, and storytelling. It requires strict resource management to maintain 60fps across mobile and desktop.

## Architectural Architecture

### 1. Modern Three.js Setup with Resize & DevicePixelRatio Handling
```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
// Cap pixel ratio to 2 to prevent mobile GPU throttling on 3x screens
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

### 2. Interactive Cursor Camera Lerping
```javascript
let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
window.addEventListener('mousemove', (e) => {
  mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
});

function animate() {
  requestAnimationFrame(animate);
  // Linear interpolation (smooth damping)
  mouse.x += (mouse.targetX - mouse.x) * 0.05;
  mouse.y += (mouse.targetY - mouse.y) * 0.05;

  camera.position.x = mouse.x * 0.8;
  camera.position.y = mouse.y * 0.8;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}
animate();
```

### 3. Crucial Memory & Dispose Rules
Always dispose of geometries, materials, and textures when removing canvas or unmounting components:
```javascript
geometry.dispose();
material.dispose();
texture?.dispose();
renderer.dispose();
```
