# Baran Bozkurt — Merakın çekim alanı

Personal portfolio for a physics student and web developer. Static HTML/CSS/JavaScript, self-hosted fonts and original artwork. Hosted by GitHub Pages at https://baranbozkurt.xyz.

## Local preview

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No build or framework dependency.

## Editing

- Main content: `index.html`; design: `assets/site.css`; interactions: `assets/site.js`.
- CV content: `cv/index.html`. The print button opens the browser's print dialog; choose Save as PDF. Only profile facts present in the previous website are included; add exact employment dates, education dates and detailed skills when available.
- To publish an existing PDF later, add `assets/baran-bozkurt-cv.pdf` and point the CV links to it, or add a download link on the CV page.
- Artwork and exact image generation prompt: `docs/art-direction.md`.
- `/about/` and `/work/` redirect to the relevant main-page sections. Old cloned case-study routes redirect to the real work section and are excluded from indexing.
- `/ahmetayazbey/` is an independent, preserved project. Do not change its assets when editing the portfolio.

## Motion

CSS drift, orbit, paper arrival and a native-scroll cover sequence. The lab uses equal-mass double-pendulum equations integrated using RK4 at a fixed 120 Hz, rendered via requestAnimationFrame. Canvas resolution is capped at 2x pixel density, trails are bounded, and animation stops offscreen and in background tabs. OS reduced-motion and a persistent footer control are supported. Content remains readable with JavaScript disabled.
