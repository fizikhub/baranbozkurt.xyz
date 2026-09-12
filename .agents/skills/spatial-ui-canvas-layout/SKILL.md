---
name: spatial-ui-canvas-layout
description: >-
  Infinite canvas and spatial UI architecture (Figma / Miro style). Use for pan-and-zoom matrices, zoom-to-cursor math, minimaps, spatial node connectors, and viewport culling.
---

# Infinite Canvas & Spatial UI Architecture

## Overview
Spatial interfaces allow users to navigate an unbounded 2D plane with continuous zoom and pan capabilities.

## Zoom-to-Cursor Mathematical Transform
When zooming with mouse wheel, the point under the cursor must remain invariant:
```javascript
let scale = 1;
let pan = { x: 0, y: 0 };

function handleWheel(e) {
  e.preventDefault();
  const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
  const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 10);

  // Mouse position relative to viewport
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Invariant zoom offset calculation
  pan.x = mouseX - (mouseX - pan.x) * (newScale / scale);
  pan.y = mouseY - (mouseY - pan.y) * (newScale / scale);
  scale = newScale;

  canvasElement.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${scale})`;
}
```

## Performance & Culling
Only render or recalculate nodes whose bounding box intersects the current viewport frustum.
