---
name: form-ux-validation
description: >-
  High-conversion form design and modern validation UX. Use for designing frictionless checkout/signup forms, inline real-time feedback with :user-valid, floating labels, auto-advancing OTP codes, and error recovery.
---

# High-Conversion Form Design & Validation UX

## Overview
Forms are the primary conversion engine of digital products. Poor validation, ambiguous labels, and jarring error states cause 70%+ user abandonment.

## Modern CSS Validation (`:user-valid` & `:user-invalid`)
Unlike `:valid` (which triggers before the user even finishes typing), `:user-valid` and `:user-invalid` only evaluate after the user interacts and blurs:
```css
.input-field:user-invalid {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.input-field:user-valid {
  border-color: #10b981;
}
```

## Key UX Principles for High-Converting Forms
1. **Single-Column Layout**: Multi-column forms confuse eye-tracking paths and increase cognitive load.
2. **Top-Aligned Labels**: Studies show top-aligned labels allow fastest scanning and completion times.
3. **Inline Helper Context**: State password requirements or date formats *before* the user triggers an error.
4. **Smart Keyboard Attributes**:
   - `inputmode="numeric"` for verification codes.
   - `type="email" autocomplete="email"` for login fields.
5. **Clear Error Messaging**: State *what happened* and *how to fix it* (e.g. "Password must include at least 8 characters and 1 number").
