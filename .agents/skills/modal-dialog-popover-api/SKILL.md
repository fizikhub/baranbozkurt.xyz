---
name: modal-dialog-popover-api
description: >-
  Native HTML dialog element and modern Popover API implementation. Use for modals, slide-out drawers, tooltips, and action menus with top-layer rendering, backdrop styling, and automatic focus management.
---

# Native Dialog & Popover API

## Overview
Modern browsers now provide native `<dialog>` and the `popover` attribute, rendering elements directly into the browser's **Top Layer** above all other z-index stacks.

## 1. Native Modal Dialog
```html
<button id="open-btn">Open Account Settings</button>

<dialog id="settings-dialog" class="custom-dialog">
  <form method="dialog">
    <h2>Account Settings</h2>
    <p>Update your personal information below.</p>
    <div class="actions">
      <button value="cancel">Cancel</button>
      <button value="save" class="primary">Save Changes</button>
    </div>
  </form>
</dialog>

<script>
  const dialog = document.getElementById('settings-dialog');
  document.getElementById('open-btn').onclick = () => dialog.showModal();
</script>
```

## Styling the Native Backdrop
```css
.custom-dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  animation: fadeIn 200ms ease-out;
}
```

## 2. Popover API (Zero JS Toggle)
```html
<button popovertarget="user-menu">My Profile</button>
<div id="user-menu" popover="auto" class="dropdown-panel">
  <a href="/profile">Profile</a>
  <a href="/logout">Logout</a>
</div>
```
- `popover="auto"` automatically closes when clicking outside ("light dismiss") or pressing ESC, with zero JavaScript event listeners needed.
