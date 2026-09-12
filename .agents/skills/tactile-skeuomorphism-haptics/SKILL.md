---
name: tactile-skeuomorphism-haptics
description: >-
  Hyper-tactile digital interfaces, skeuomorphic depth, and mobile haptics. Use for realistic rotary knobs, knurled dials, mechanical push-buttons, multi-layer depth shadows, and Navigator Vibration API coordination.
---

# Tactile Skeuomorphism & Haptic Interaction Design

## Overview
Tactile skeuomorphism bridges physical hardware and digital software. By crafting realistic lighting gradients, specular rim highlights, rotary dial physics, and synchronized mobile haptics, controls feel tangible, heavy, and satisfying to touch.

---

## 1. Multi-Layered Skeuomorphic Depth & Lighting

Realistic surfaces require 3 distinct lighting layers:
1. **Specular Top Rim**: Sharp white highlight reflecting the overhead light source.
2. **Ambient Occlusion**: Deep dark inner contact shadow.
3. **Cast Shadow**: Soft diffuse shadow beneath the control.

```css
.tactile-dial {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: linear-gradient(145deg, #2a2a2e, #1a1a1d);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    /* Specular rim reflection */
    inset 0 1px 1px rgba(255, 255, 255, 0.3),
    /* Deep bottom inner shadow */
    inset 0 -2px 4px rgba(0, 0, 0, 0.8),
    /* Soft ambient cast shadow */
    0 8px 16px -4px rgba(0, 0, 0, 0.5),
    /* Hard contact shadow */
    0 2px 4px rgba(0, 0, 0, 0.4);
  position: relative;
  cursor: grab;
  user-select: none;
  touch-action: none;
}

/* Mechanical knurled edge simulation */
.tactile-dial::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    #252528 0deg 2deg,
    #18181b 2deg 4deg
  );
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.7);
}

/* Central cap & indicator dot */
.tactile-dial-cap {
  position: absolute;
  inset: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #323236, #1c1c1f);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.6);
  display: grid;
  place-items: center;
}

.tactile-indicator-dot {
  width: 5px;
  height: 5px;
  background: #e35342; /* Illuminated LED dot */
  border-radius: 50%;
  position: absolute;
  top: 6px;
  box-shadow: 0 0 6px #e35342, 0 0 12px rgba(227, 83, 66, 0.5);
}
```

---

## 2. Interactive Rotary Dial Math with Detent Haptics

Calculates angle based on cursor position relative to element center, firing tactile vibration on discrete notches:

```javascript
export function initRotaryDial(dialEl, onValueChange) {
  let isDragging = false;
  let currentAngle = 0; // -135deg to +135deg
  let lastDetent = 0;

  dialEl.addEventListener('pointerdown', (e) => {
    isDragging = true;
    dialEl.setPointerCapture(e.pointerId);
    dialEl.style.cursor = 'grabbing';
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const rect = dialEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rad = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    let deg = (rad * 180) / Math.PI + 90; // Align 0 to top
    if (deg > 180) deg -= 360;

    // Clamp between -135 and +135 degrees
    currentAngle = Math.max(-135, Math.min(135, deg));
    dialEl.style.transform = `rotate(${currentAngle}deg)`;

    // Calculate normalized value 0.0 to 1.0
    const normalized = (currentAngle + 135) / 270;

    // Fire haptic detents every 10%
    const currentDetent = Math.floor(normalized * 10);
    if (currentDetent !== lastDetent) {
      triggerHapticTick();
      lastDetent = currentDetent;
    }

    if (onValueChange) onValueChange(normalized);
  });

  window.addEventListener('pointerup', () => {
    if (!isDragging) return;
    isDragging = false;
    dialEl.style.cursor = 'grab';
  });
}
```

---

## 3. Synchronized Mobile Haptics (Vibration API)

Trigger snappy mechanical vibrations for mobile users:

```javascript
export function triggerHapticTick() {
  if ('vibrate' in navigator) {
    // 8ms micro-pulse feels like a physical mechanical click
    navigator.vibrate(8);
  }
}

export function triggerHapticSuccess() {
  if ('vibrate' in navigator) {
    // Dual pulse confirming an action
    navigator.vibrate([12, 40, 18]);
  }
}
```

---

## 4. Tactile UX Guidelines
- **Always Pair Haptics with Micro-Sound**: For desktop users where `navigator.vibrate` is unavailable, audio synthesis provides the tactile confirmation.
- **Physical Bounds**: Mechanical dials never spin 360 degrees endlessly unless they are encoders; real pots have hard physical stop notches (-135 to +135 deg).
- **Subtle Glow**: Illuminated indicators should cast soft bloom shadows on adjacent surfaces.
