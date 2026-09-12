---
name: shadcn-radix-primitives
description: >-
  Headless accessible UI engineering with Radix UI and shadcn/ui. Use for building customizable, unstyled, keyboard-accessible component primitives with polymorphic composition and Tailwind CSS.
---

# Headless Primitives & shadcn/ui Architecture

## Overview
Radix UI primitives solve the hardest problems in web UI: ARIA state bindings, focus management, roving tabindex, keyboard shortcuts, and portal mounting, allowing you to focus entirely on visual styling.

## Polymorphic Slot Composition (`asChild`)
Radix components use the Slot pattern (`asChild`) to merge functionality into your custom elements without wrapper div bloat:
```tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

<DropdownMenu.Item asChild>
  <Link href="/profile" className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted">
    Profile Settings
  </Link>
</DropdownMenu.Item>
```

## Building Reusable Compound Components
Use Tailwind `cva` (class-variance-authority) for bulletproof variants:
```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8 text-base"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);
```
