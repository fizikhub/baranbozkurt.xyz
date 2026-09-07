# Ahmet Ayazbey Visual System

## Direction

Mobile-first product showroom. The physical scene is a softly lit Istanbul apartment where dark timber, pale upholstery and stone surfaces are seen in real use. The interface behaves like a quiet gallery label around those objects.

## Signature

The hero opens with a single cobalt “aperture” sweep across a real product image. Cobalt returns only for high-intent actions and factual highlights, making it a recognizable but restrained mark.

## Color

- Stage: `oklch(0.07 0 0)`
- Ink: `oklch(0.13 0.01 262)`
- Canvas: `oklch(1 0 0)`
- Surface: `oklch(0.955 0.004 262)`
- Muted: `oklch(0.46 0.015 262)`
- Brand cobalt: `oklch(0.34 0.159 262.4)`

Strategy: restrained black and true white with cobalt under ten percent of the visual field.

## Typography

- Display: Gloock, used for emotional phrases and no more than one focal headline per section.
- Interface and body: Archivo variable, width axis slightly condensed for a furniture-label quality.
- Display tracking never tighter than `-0.04em`; prose is capped near 52 characters where possible.

## Layout

Mobile uses full-width images, a two-column asymmetrical collection and persistent contact access. Desktop expands into a 12-column gallery with deliberate stagger rather than equal cards.

## Motion

- One 1.45s hero aperture sweep on first load.
- Slow image-scale response to scrolling and short transform-only hover cues.
- Native dialog transition for product details.
- All ambient and spatial motion collapses under `prefers-reduced-motion`.
