---
name: drag-and-drop-interactions
description: >-
  Fluid drag-and-drop interaction design. Use for Kanban boards, reorderable lists, file upload drop zones, visual collision indicators, ghost drag overlays, and accessible keyboard-controlled dragging.
---

# Drag & Drop UX & Physics

## Overview
Drag-and-drop interfaces (Kanban boards, file managers, layout builders) require immediate visual feedback, spatial collision detection, and tactile physics.

## UX Checklist for Drag & Drop
1. **Grab Cursor**: Cursor changes from `grab` to `grabbing` on mousedown.
2. **Ghost / Drag Overlay**: Lift the dragged item with an elevated shadow and slight tilt (`rotate(3deg) scale(1.03)`).
3. **Drop Target Highlighting**: Glow or outline the valid drop column/slot as the cursor enters.
4. **Layout Displacement Animation**: Smoothly slide adjacent sibling items out of the way to make room.
5. **Accessible Keyboard Alternative**: Allow users to focus an item, press `Space` to pick up, `Arrow` keys to move, and `Space` to drop (WCAG 2.5.7).

## File Upload Dropzone State Machine
```css
.dropzone {
  border: 2px dashed #cbd5e1;
  transition: all 200ms ease;
}
.dropzone.is-active {
  border-color: #6366f1;
  background-color: rgba(99, 102, 241, 0.05);
  transform: scale(1.01);
}
```
