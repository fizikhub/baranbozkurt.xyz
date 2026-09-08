# Ahmet Ayazbey Store Visual System

## Direction
Mobile-first furniture commerce: dense enough to feel like a real store, quiet enough for real product photography to lead. The visual source is the user's Turkish furniture-commerce references: announcement, functional header, search, category shortcuts, trust benefits, two-column product grid, category panels and cart.

## Color
- Ink: `oklch(0.16 0 0)`
- Canvas: `oklch(1 0 0)`
- Soft surface: `oklch(0.965 0 0)`
- Muted: `oklch(0.47 0 0)`
- Walnut accent: `oklch(0.48 0.075 55)`

Black and true white dominate. Walnut is used only for selected facts, icons and material cues.

## Typography
Manrope is the single commerce family. Its compact forms support Turkish text, prices and dense mobile controls without a luxury-editorial affectation.

## Layout
The mobile storefront follows a practical vertical rhythm: promotion → sticky header → search → category circles → campaign hero → service benefits → two-column product grid → room categories → custom order. Desktop expands to a four-column product grid and split campaign composition.

## Components
Soft 12–18px corner geometry for search, imagery and action surfaces; circular category photography; pill filters and factual badges; persistent favorites; right-side cart drawer; product quick-view dialog; mobile commerce dock and a two-step order-request checkout. Product cards lead to a dedicated product-detail route with immersive photography, finish selection, quantity controls, specifications and related products.

## Motion
Short transform/opacity transitions only: manual hero change, drawer movement, image hover and toast feedback. No auto-rotating carousel. All movement collapses under `prefers-reduced-motion`.
