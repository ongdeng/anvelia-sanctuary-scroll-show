# Anvelia Vite React Switch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Anvelia prototype into a Vite + React scroll-slide website with real GSAP/ScrollTrigger choreography, multiple useful slides, and a motion-preview override.

**Architecture:** Replace the CDN-driven static root with a React composition that owns slide data, asset imports, reduced-motion behavior, and GSAP lifecycle cleanup. Keep the Anvelia cinematic as a pinned scroll stage, then add product sections so the website feels useful after the opening.

**Tech Stack:** Vite, React, GSAP, ScrollTrigger, CSS custom properties, existing Anvelia raster assets, Browser verification.

---

## File Structure

- Create: `package.json` - Vite scripts and local dependencies.
- Create: `src/main.jsx` - React entry.
- Create: `src/App.jsx` - App shell, GSAP setup, slide components, reduced-motion override.
- Create: `src/data/anveliaScenes.js` - Slide and offering content.
- Create: `src/styles.css` - Full visual system and responsive layout.
- Modify: `index.html` - Vite root markup.
- Modify: `DESIGN.md` - React/Vite and motion-preview notes.
- Create: `QA.md` - Verification evidence and known tooling constraints.

## Tasks

- [ ] Add Vite scripts and dependencies in `package.json`.
- [ ] Replace the static root HTML with the Vite mount and module script.
- [ ] Create the React entry and scene data files.
- [ ] Build `App.jsx` with a pinned GSAP ScrollTrigger deck, product slides, and reduced-motion fallback.
- [ ] Add the relaxed Anvelia visual system in `src/styles.css`.
- [ ] Install dependencies or document the tooling blocker.
- [ ] Run build/dev server and Browser QA on desktop, mobile, reduced motion, and `?motion=on`.

## Self-Review

Spec coverage:
- Converts the root to Vite + React.
- Keeps GSAP/ScrollTrigger as the animation runtime.
- Adds actual slide architecture beyond the first two frames.
- Preserves Anvelia public selectors and visual direction.
- Addresses the previous failure modes: reduced motion and missing CDN GSAP.

Placeholder scan:
- No placeholders remain in the executable tasks.

Type consistency:
- Selectors, component names, and asset constants are consistent across planned files.
