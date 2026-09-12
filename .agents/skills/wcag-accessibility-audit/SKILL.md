---
name: wcag-accessibility-audit
description: >-
  Comprehensive WCAG 2.2 AA/AAA accessibility audit standards. Use for auditing color contrast, screen reader semantics (NVDA, VoiceOver), ARIA roles and live regions, semantic HTML elements, and form accessibility.
---

# WCAG 2.2 Accessibility Auditing

## Overview
Accessibility ensures all users, including those with visual, auditory, motor, or cognitive impairments, can navigate and interact with your web application effortlessly.

## The 4 Principles of WCAG (POUR)
1. **Perceivable**: Text alternatives for images, captions for video, contrast ratios (min 4.5:1 for normal text, 3:1 for large text).
2. **Operable**: All functionality accessible via keyboard, no keyboard traps, ample time to read/interact.
3. **Understandable**: Predictable navigation, clear input error feedback, readable language declarations (`<html lang="tr">`).
4. **Robust**: Clean semantic HTML compatible with assistive technologies and screen readers.

## Critical Audit Checklist
- `alt` text: Informative images must describe the content; purely decorative images must use `alt=""`.
- Forms: Every `<input>` must have an associated `<label for="...">`.
- Live regions: Use `aria-live="polite"` for asynchronous notifications and toast alerts.
- Headings: Maintain hierarchical sequence (`h1` -> `h2` -> `h3`); never skip levels for visual sizing.
