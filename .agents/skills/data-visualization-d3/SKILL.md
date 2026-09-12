---
name: data-visualization-d3
description: >-
  Interactive data visualization and charting with D3.js and SVG. Use for building custom dashboards, time-series line charts, interactive bar charts, animated domain interpolations, and rich hover tooltips.
---

# D3.js Data Visualization & SVG Graphics

## Overview
Data visualization bridges raw metrics and human comprehension. High-grade charts require crisp SVG rendering, responsive viewBox scaling, and animated transitions.

## Responsive SVG ViewBox Pattern
Never set hardcoded pixel widths and heights on SVG containers:
```tsx
export const LineChart = ({ data, width = 600, height = 300 }) => {
  return (
    <div className="w-full aspect-[2/1] relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* D3 scale pathways, axes, and interactive hover dots */}
      </svg>
    </div>
  );
};
```

## D3 Transitions & Scales
- Use `d3.scaleTime()`, `d3.scaleLinear()`, and `d3.line().curve(d3.curveMonotoneX)` for smooth aesthetic curves.
- Tooltip hover cards should be rendered in HTML/CSS floating above the SVG to support rich CSS styling, shadows, and text formatting.
