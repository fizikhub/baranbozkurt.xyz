---
name: perceived-performance-ux
description: >-
  Psychological UX and perceived performance optimization. Use for optimistic UI updates, skeleton screen shimmers, progressive image blur-ups, and eliminating Cumulative Layout Shift (CLS).
---

# Perceived Performance & Optimistic UI

## Overview
Users perceive speed based on feedback immediacy rather than raw network latency. An application that responds in 10ms with an optimistic update feels 10x faster than an app waiting for server roundtrips.

## 1. Optimistic UI Mutations
Update the UI immediately when the user likes, bookmarks, or submits an item, rolling back only if the server request fails:
```tsx
const toggleLike = async (postId: string) => {
  // 1. Optimistic instant visual toggle
  setLiked(prev => !prev);
  setCount(prev => liked ? prev - 1 : prev + 1);

  try {
    await api.post(`/posts/${postId}/like`);
  } catch (err) {
    // 2. Rollback on failure + show toast
    setLiked(prev => !prev);
    setCount(prev => liked ? prev + 1 : prev - 1);
    toast.error("Network error. Could not like post.");
  }
};
```

## 2. Skeleton Shimmer vs Loading Spinners
Spinners make users feel like they are waiting. Skeleton screens mimic the final layout structure, reducing perceived wait times by up to 40%.
```css
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: #e2e8f0;
}
.skeleton::after {
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background-image: linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
  animation: shimmer 1.5s infinite;
  content: '';
}
```
