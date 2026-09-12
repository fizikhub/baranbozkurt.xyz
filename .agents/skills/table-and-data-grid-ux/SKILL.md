---
name: table-and-data-grid-ux
description: >-
  Enterprise data tables and grid UX. Use for responsive card transformations, sticky headers/frozen columns, multi-column sorting, pagination vs virtual scroll, row selection, and inline editing.
---

# Complex Data Tables & Grid UX

## Overview
Tables display structured, information-dense records. High-utility tables provide sorting, filtering, row selection, column freeze, and mobile responsiveness.

## Responsive Mobile Card Transformation
Standard horizontal tables break on mobile screens. Transform rows into stacked cards on narrow viewports:
```css
@media (max-width: 640px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr {
    margin-bottom: 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 8px;
  }
  td {
    display: flex;
    justify-content: space-between;
    padding: 6px 12px;
  }
  td::before {
    content: attr(data-label);
    font-weight: 600;
  }
}
```

## Sticky Headers & Columns
Use `position: sticky; top: 0; z-index: 10;` with an explicit solid background on `<th>` cells so scrolling content doesn't bleed through underneath.
