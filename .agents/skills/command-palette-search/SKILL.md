---
name: command-palette-search
description: >-
  Power-user Command Palettes (Cmd+K) and fuzzy search interfaces. Use for building Spotlight/Raycast-style action palettes, keyboard shortcuts navigation, search ranking, and instant keyboard workflows.
---

# Command Palette (Cmd+K) & Search UX

## Overview
Command palettes enable power users to navigate, execute actions, and search resources without taking their hands off the keyboard.

## Key Interaction Architecture
1. **Universal Shortcut**: Global `Cmd+K` (Mac) and `Ctrl+K` (Windows/Linux) trigger.
2. **Keyboard Navigation**: Arrow Up / Down for selection, Enter for execution, Escape to dismiss.
3. **Fuzzy Search & Scoring**: Match initials, substrings, and typos gracefully.
4. **Grouped Categories**: "Navigation", "Recent Actions", "Help & Settings", "Documentation".

## Implementation Reference (cmdk Pattern)
```tsx
import { Command } from 'cmdk';

export function QuickCommandPalette({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu">
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No matching actions found.</Command.Empty>
        
        <Command.Group heading="Quick Navigation">
          <Command.Item onSelect={() => navigate('/projects')}>View Projects</Command.Item>
          <Command.Item onSelect={() => navigate('/billing')}>Billing & Usage</Command.Item>
        </Command.Group>

        <Command.Group heading="Actions">
          <Command.Item onSelect={() => createNewProject()}>Create New Project...</Command.Item>
          <Command.Item onSelect={() => toggleTheme()}>Toggle Dark Theme</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
```
