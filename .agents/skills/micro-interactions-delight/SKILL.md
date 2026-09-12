---
name: micro-interactions-delight
description: >-
  Designing high-fidelity micro-interactions and tactile feedback. Use for crafting magnetic buttons, elastic toggles, smooth checkmarks, skeleton shimmers, audio feedback cues, and rewarding interaction moments.
---

# Micro-Interactions & Tactile Polish

## Overview
Micro-interactions are the subtle feedback loops that transform a functional application into a premium, memorable experience.

## Anatomy of a Micro-Interaction (Dan Saffer Model)
1. **Trigger**: User hover, tap, or system notification.
2. **Rules**: What state changes occur.
3. **Feedback**: Visual motion, haptic pulse, or sound cue.
4. **Loops & Modes**: What happens after completion.

## Magnetic Button Pattern
Button subtly pulls toward the user's cursor when within proximity:
```javascript
const btn = document.querySelector('.magnetic-btn');
btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
});
btn.addEventListener('mouseleave', () => {
  btn.style.transform = 'translate(0px, 0px)';
});
```

## Tactical Rules
- Keep durations snappy: 150ms to 300ms. Anything over 400ms feels sluggish.
- Deceleration curves (`ease-out`) feel responsive; linear feels robotic.
- Provide physical spring bounce on release.
