---
name: atomic-component-design
description: >-
  Atomic design methodology and UI component state machines. Use for architecting design system component trees (atoms, molecules, organisms), managing all component interaction states, and strict props interfaces.
---

# Atomic Design & Component State Machines

## Overview
Atomic Design breaks interfaces down into hierarchical building blocks:
1. **Atoms**: Icons, buttons, labels, inputs.
2. **Molecules**: Form input group (label + input + error hint), search bar.
3. **Organisms**: Navbar, user profile card, data table.
4. **Templates & Pages**: Layout structures populated with real data.

## Mandatory Component Interaction States
Every interactive component must explicitly handle and style all 8 states:
1. `idle`: Standard resting state.
2. `hover`: Cursor hovering.
3. `focus-visible`: Keyboard navigation focus ring.
4. `active`: Mouse down / finger pressed.
5. `disabled`: Inactive, pointer-events: none, reduced opacity, aria-disabled="true".
6. `loading`: Spinner or skeleton, preserving dimensions.
7. `error`: Validation error, red borders, aria-invalid="true".
8. `success`: Confirmation state.

## State Pattern Checklist
- Never rely on color alone to indicate error or success states (add an icon or helper text).
- Always maintain layout stability when switching between idle and loading states to avoid layout shifts.
