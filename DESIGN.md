# Anvelia Visual Identity

## Style Prompt
Anvelia should feel warm, natural, cinematic, and calm. The opening sequence should look like a premium forest retreat emerging through light mist, with slow fades, gentle clarity changes, and restrained type. Avoid hard tech styling, loud gradients, heavy black overlays, or fast kinetic motion.

## Colors
- Forest: `#183d2d` for deep organic structure and dark text.
- Gold: `#c69b4f` for restrained premium accents.
- Mist: `#edf2e6` for airy natural backgrounds.
- Ink: `#13261e` for grounded foreground contrast.
- Cream: `#fbf6e8` for warm title text over imagery.

## Typography
- Display: Georgia or another elegant editorial serif.
- Supporting text: Arial or another clean humanist sans serif.
- Letter spacing should stay neutral for large type and slightly expanded only for small uppercase eyebrow text.

## Motion
- Use slow scroll-scrubbed fades and scale changes.
- Use mist as the transition layer between scenes.
- Animate transform, opacity, and subtle filter clarity.
- Keep timeline labels portable to HyperFrames: `opening`, `mist-bridge`, `hero-reveal`, `clarity`, `title`, `hold`.
- The Vite + React version imports GSAP and ScrollTrigger from npm instead of CDN globals.
- Reduced-motion users see a calm final state by default; `?motion=on` or the in-page motion preview button forces the scroll show for review.

## What Not To Do
- Do not use jump cuts between image states.
- Do not dominate the page with a single purple, blue, beige, brown, or orange palette.
- Do not animate layout properties for movement.
- Do not add extra generated imagery unless the existing assets cannot support the transition.
- Do not let title text cover the main focal area on mobile.

## React Website Architecture

The root website is now a Vite + React app:

- `src/App.jsx` owns the scroll deck, reduced-motion behavior, and `gsap.context()` cleanup.
- `src/data/anveliaScenes.js` owns slide and offering copy so later slides can be expanded without rewriting animation markup.
- `src/styles.css` preserves the public selectors `#anvelia-scroll-deck`, `.slide-layer`, `.opening-layer`, `.mist-layer`, `.hero-layer`, and `.hero-title`.

The first cinematic sequence stays portable to HyperFrames by preserving labels for `opening`, `mist-bridge`, `hero-reveal`, `clarity`, `title`, `stays`, `cultivation`, `gatherings`, and `hold`.
