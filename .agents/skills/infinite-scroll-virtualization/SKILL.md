---
name: infinite-scroll-virtualization
description: >-
  DOM virtualization and high-performance infinite scrolling. Use when rendering large datasets (1,000 to 100,000+ items), feed virtualization, preventing layout shifts, and preserving scroll position.
---

# DOM Virtualization & Infinite Scroll

## Overview
Rendering thousands of DOM nodes causes memory bloat, sluggish scrolling, and frame drops. Virtualization renders only the items currently visible in the user's viewport plus a small buffer.

## Virtualization Architecture (TanStack Virtual / Windowing)
```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

export function VirtualizedList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // Estimated row height in px
    overscan: 5, // Extra rows above/below viewport
  });

  return (
    <div ref={parentRef} className="h-[600px] overflow-auto border rounded-xl">
      <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`
            }}
          >
            {items[virtualRow.index].title}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Infinite Scroll Rules
- Always provide a way to access footer links (pure infinite scroll traps keyboard users from ever reaching the footer).
- Preserve scroll position when user clicks into an item and navigates back.
