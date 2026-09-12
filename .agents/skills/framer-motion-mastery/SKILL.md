---
name: framer-motion-mastery
description: >-
  Mastery over Framer Motion in React/Next.js. Use for declarative UI animations, complex layout transitions, gesture physics, drag interactions, scroll-linked animations, and exit transitions.
---

# Framer Motion Mastery

## Overview
Framer Motion is the production standard animation library for React. It uses physics-based spring simulations, automatic layout projection, and declarative gesture recognition.

## Core Concepts & Patterns

### 1. Spring-Based Micro-Interactions
Avoid duration-based linear/ease animations for user interactions. Use physical springs:
```tsx
import { motion } from 'framer-motion';

export const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.04, y: -2 }}
    whileTap={{ scale: 0.96 }}
    transition={{ type: "spring", stiffness: 400, damping: 25 }}
    onClick={onClick}
    className="px-5 py-2.5 rounded-xl font-medium bg-primary text-white shadow-md hover:shadow-lg"
  >
    {children}
  </motion.button>
);
```

### 2. Layout Animations (`layout` & `layoutId`)
Morph between states or share elements across tabs without manual position math:
```tsx
// Active tab indicator morphing across siblings
<nav className="flex gap-2 relative">
  {tabs.map((tab) => (
    <button key={tab.id} onClick={() => setActive(tab.id)} className="relative px-4 py-2">
      {tab.label}
      {active === tab.id && (
        <motion.div
          layoutId="active-indicator"
          className="absolute inset-0 bg-accent/20 rounded-lg -z-10"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </button>
  ))}
</nav>
```

### 3. Orchestration with Variants
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};
```

### Rules & Performance
- **Hardware Acceleration**: Only animate `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`. Never animate `width`, `height`, `top`, or `margin` directly without `layout`.
- **AnimatePresence**: Always provide unique `key` props to children inside `<AnimatePresence mode="wait">`.
- **Reduced Motion**: Always wrap motion components or use `useReducedMotion()` to respect user accessibility preferences.
