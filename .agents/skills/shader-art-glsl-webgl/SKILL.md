---
name: shader-art-glsl-webgl
description: >-
  Custom WebGL and GLSL shaders for avant-garde visuals. Use for fluid liquid distortions, interactive mouse ripple shaders, Simplex/Perlin noise displacements, chromatic aberration, raymarching, holographic materials, and film grain post-processing.
---

# Shader Art & GLSL WebGL Engineering

## Overview
Shaders run directly on the GPU, calculating millions of pixels in parallel. Custom GLSL (OpenGL Shading Language) fragment and vertex shaders provide maximum creative originality, delivering fluid liquid effects, organic noise distortions, holographic refractions, and cinematic grain that cannot be achieved with standard CSS.

---

## 1. Minimal Three.js Custom ShaderMaterial Boilerplate

```javascript
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Subtle wave distortion based on vertex coordinates
    float wave = sin(pos.x * 3.0 + uTime) * cos(pos.y * 3.0 + uTime) * 0.1;
    pos.z += wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  // 2D Simplex / Perlin Noise utility
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * 0.0243902439) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from cursor for interactive liquid ripple
    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 20.0 - uTime * 4.0) * exp(-dist * 4.0);
    
    // Chromatic aberration UV offset
    float noiseVal = snoise(uv * 3.0 + uTime * 0.2);
    vec2 distortedUv = uv + vec2(ripple * 0.03 + noiseVal * 0.01);
    
    float r = texture2D(uTexture, distortedUv + vec2(0.003, 0.0)).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - vec2(0.003, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uTexture: { value: null }
  }
});
```

---

## 2. Interactive Pointer Uniform Smoothing (Lerp)

Always interpolate mouse coordinates in JavaScript before passing them to GPU uniforms:
```javascript
let targetMouse = { x: 0.5, y: 0.5 };
let currentMouse = { x: 0.5, y: 0.5 };

window.addEventListener('pointermove', (e) => {
  targetMouse.x = e.clientX / window.innerWidth;
  targetMouse.y = 1.0 - (e.clientY / window.innerHeight); // Invert Y for GLSL UV space
});

function render(time) {
  currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
  currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;

  material.uniforms.uTime.value = time * 0.001;
  material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
```

---

## 3. High-Quality Film Grain & Dither Shader Snippet

Film grain adds analog warmth and hides color banding:
```glsl
float pseudoRandom(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void applyGrain(inout vec3 color, vec2 uv, float time, float intensity) {
  float noise = (pseudoRandom(uv + fract(time)) - 0.5) * intensity;
  color += noise;
}
```

---

## 4. Crucial Performance & GPU Safeguards
- **Cap Device Pixel Ratio**: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`.
- **Render-on-Demand / Observer**: Stop `requestAnimationFrame` rendering when canvas is outside the viewport using `IntersectionObserver`.
- **Dispose Resources**: When components unmount, dispose textures, geometries, and materials to prevent WebGL context loss.
- **prefers-reduced-motion**: Freeze `uTime` or disable high-frequency distortion when users prefer reduced motion.
