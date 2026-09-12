---
name: glassmorphism-neo-skeuomorphism
description: >-
  Crafting premium glassmorphism, frosted glass UI, and tactile skeuomorphic depth. Use for building glowing cards, specular border highlights, subtle inner shadows, and layered spatial interfaces.
---

# Glassmorphism & Tactile UI Craftsmanship

## Overview
High-end digital interfaces (Apple visionOS, Stripe, Linear) use subtle optical depth: multi-layered translucent glass, light reflections on edges, and soft ambient shadows.

## The Recipe for Realistic Glassmorphism
Raw `background: rgba(255,255,255,0.2)` with `backdrop-filter: blur(10px)` looks cheap and murky. High-grade glass requires 4 specific layers:

```css
.premium-glass-card {
  /* 1. Translucent Tinted Base */
  background: rgba(255, 255, 255, 0.06);
  
  /* 2. Layered Blur & Saturation boost */
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  
  /* 3. Specular Border Highlight (simulating glass edge reflection) */
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-top-color: rgba(255, 255, 255, 0.35); /* Top catch-light */
  
  /* 4. Dual Ambient Shadow + Inset Specular */
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.25),
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.25);
    
  border-radius: 20px;
}
```

## Dark Mode Tactical Adjustment
In dark themes, glass cards must be dark-tinted (`rgba(20, 20, 25, 0.6)`) to preserve text legibility and prevent muddy contrast.
