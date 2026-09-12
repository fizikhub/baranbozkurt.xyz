---
name: creative-cursor-audio-effects
description: >-
  Creative interaction design: custom interactive cursor followers, blend-mode text inverters, subtle spatial micro-audio cues (Web Audio API), and playful canvas physics.
---

# Creative Interactive Cursor & Micro-Audio

## Overview
Creative portfolio and agency websites use customized interactive cursors and subtle sound design to create an immersive, tactile atmosphere.

## 1. Smooth Inverting Cursor Follower
```html
<div class="cursor-dot"></div>
<div class="cursor-ring"></div>

<style>
.cursor-dot, .cursor-ring {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
  z-index: 9999;
  mix-blend-mode: difference;
}
.cursor-dot {
  width: 8px;
  height: 8px;
  background: white;
}
.cursor-ring {
  width: 40px;
  height: 40px;
  border: 1.5px solid white;
  transition: transform 150ms ease-out, width 200ms ease, height 200ms ease;
}
/* Expanded state when hovering links */
body.hovering-link .cursor-ring {
  width: 64px;
  height: 64px;
  background: white;
}
</style>
```

## 2. Synthesizing Subtle Micro-Audio Clicks (Zero Audio File Bloat)
Use the native Web Audio API to synthesize subtle, satisfying interaction pops without downloading MP3 files:
```javascript
function playTick() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
  
  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}
```
