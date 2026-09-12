---
name: audio-reactive-visual-synthesizer
description: >-
  Web Audio API integration and audio-reactive visuals. Use for AnalyserNode FFT frequency mapping, reactive waveform canvas animations, procedural UI sound synthesizers (chimes, clicks, sub-bass), and spatial stereo panning.
---

# Audio-Reactive Visuals & Procedural Web Synthesizer

## Overview
Audio deepens digital presence. By synthesizing procedural audio with the native Web Audio API and visualizing frequency bins in real time via canvas or shaders, interfaces gain multisensory depth without loading heavy external sound libraries.

---

## 1. Browser Autoplay Compliant Audio Context Singleton

Browsers require a user gesture before starting audio. Always initialize lazily:

```javascript
class AudioManager {
  constructor() {
    this.ctx = null;
    this.analyser = null;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128; // 64 frequency bins
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }
}

export const audio = new AudioManager();
```

---

## 2. Procedural UI Micro-Sound Generators (Zero Assets)

Synthesize organic UI feedback procedurally without downloading audio files:

```javascript
// Warm tactile switch click
export function playTactileClick() {
  const ctx = audio.ensureContext();
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  // Noise-like low click
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.025);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, ctx.currentTime);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.025);
}

// Resonant notification chime
export function playHarmonicChime(freq = 520) {
  const ctx = audio.ensureContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime);

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.6);
}
```

---

## 3. Real-Time FFT Frequency Waveform Visualizer

Draw audio spectrum waveforms to an HTML5 canvas:

```javascript
export function initAudioVisualizer(canvas, analyser) {
  const ctx = canvas.getContext('2d');
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  function draw() {
    requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = (canvas.width / bufferLength) * 2;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const barHeight = (dataArray[i] / 255) * canvas.height;
      
      // Dynamic color based on amplitude
      ctx.fillStyle = `hsl(${15 + dataArray[i] * 0.2}, 80%, 55%)`;
      ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);

      x += barWidth;
    }
  }
  draw();
}
```

---

## 4. Cursor-Linked Stereo Panning

Pan micro-interaction audio from left to right as the cursor moves across the screen:

```javascript
export function playSpatialTick(cursorX) {
  const ctx = audio.ensureContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const panner = ctx.createStereoPanner();

  // Normalize cursorX: -1 (far left) to +1 (far right)
  const panValue = Math.max(-1, Math.min(1, (cursorX / window.innerWidth - 0.5) * 2));
  panner.pan.setValueAtTime(panValue, ctx.currentTime);

  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.03);

  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

  osc.connect(panner);
  panner.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.03);
}
```

---

## 5. Golden Rules for Web Audio
- **Subtlety is Sacred**: Interface sounds should never exceed 0.05 gain. Keep them whispering, never jarring.
- **Respect Mute State**: Always provide a global sound toggle switch and store preferences in `localStorage`.
- **Zero Memory Leaks**: Disconnect nodes and stop oscillators promptly upon completion.
