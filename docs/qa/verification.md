# Verification — 2026-09-08

- Browser checks at 320, 390, 768 and 1440 CSS pixels: document width matches viewport, no heading extends past either edge, both images loaded.
- Visual inspection: desktop hero and biography; mobile hero, work cards, experiment, contact and CV. Final first-screen captures are adjacent to this report.
- Main navigation reaches the intended sections. CV route renders responsively. Contact copy action returned “Kopyalandı!”. Email links are mailto links.
- Experiment pause/resume, random restart and persistent motion reduction verified through actual controls. Reduced mode reports a static view. Initial browser console: no errors or warnings.
- Local image, stylesheet, script, icon, page and fragment references validated: no missing resources or anchors. Semantic heading IDs are unique.
- JavaScript syntax checked with Node. Double-pendulum integration tested over 120 simulated seconds for three initial configurations: all finite; relative energy drift below 0.085%.
- Text contrast: ink/orange 5.78:1; ink/light 14.13:1; dark orange/light 4.65:1; secondary/light-on-dark 9.81:1; lab secondary/sage 4.55:1.
- All 12 tracked files under /ahmetayazbey/ match their pre-redesign Git blob hashes exactly.
- No external script dependencies. Self-hosted WOFF2 fonts with licenses. Hero artwork delivered as a 307 KB WebP with transparency; original PNG retained.
- No-JavaScript content and links remain in HTML, the experiment has a static SVG fallback, JS-only buttons are hidden through noscript CSS.

Limitations: viewport emulation in the available browser, not tests on physical iOS/Android devices. Browser print CSS is provided; no user-supplied finished CV/PDF exists, and no additional biographical details were invented. Print dialog output was not exported during QA.
