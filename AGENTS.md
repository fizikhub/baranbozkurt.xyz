# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable visual direction

- Preserve the charcoal-paper, torn-notebook, cream-and-vermilion collage language from the supplied references.
- The “Ben Kimim?” torn card must become the “Eğitimim” card through a scroll-driven spatial transition; education details reveal only after the card lands.
- Motion should feel handmade and cinematic, remain compositor-friendly, honor reduced-motion, and collapse cleanly to a legible mobile layout.
- On mobile, the “Şu anda” milestone and university-gate artwork must remain fully visible within the completed education composition, not fall below the viewport.
- Education timeline typography should feel substantial and editorial, with comfortable mobile reading sizes rather than a scaled-down desktop treatment.
