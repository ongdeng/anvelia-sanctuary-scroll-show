# Anvelia Light Content Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the new Anvelia Chinese/English content into the existing relaxed scroll website without making the page feel heavy.

**Architecture:** Keep the scroll show cinematic, then let the regular page carry quieter factual sections. Store content in `src/data/anveliaScenes.js`, render with focused React components in `src/App.jsx`, and style with existing forest, mist, cream, and gold tokens in `src/styles.css`.

**Tech Stack:** Vite, React, GSAP ScrollTrigger, CSS custom properties, existing Anvelia raster assets.

---

### Task 1: Content Data

**Files:**
- Modify: `src/data/anveliaScenes.js`

- [ ] **Step 1: Expand scene metadata**

Add short facts to the cabin, cultivation, and gathering product scenes so the existing animated slides absorb the new details:

```js
meta: "26 healing cabins · private ritual baths · mountain terraces"
```

- [ ] **Step 2: Add lightweight content arrays**

Add exports for:

```js
export const identityNotes = [...]
export const environmentHighlights = [...]
export const comparisonPlaces = [...]
export const healingPillars = [...]
export const detoxPrograms = [...]
export const thingsToDo = [...]
```

Keep each item concise enough for one line or a small card.

### Task 2: React Composition

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Import the new data**

Import the new arrays from `src/data/anveliaScenes.js`.

- [ ] **Step 2: Blend content into existing sections**

Update `SanctuaryOverview` to include the "我们是谁", 400m ridge, and provided service list in the existing overview rhythm.

- [ ] **Step 3: Add two quiet sections**

Add:
- `EnvironmentSection` for "为什么选择这里", highlights, and comparison places.
- `HealingSystemSection` for six core pillars, detox program lengths, things to do, and product facts.

- [ ] **Step 4: Render sections before inquiry**

Render `EnvironmentSection` and `HealingSystemSection` between `SanctuaryOverview` and `InquirySection`.

### Task 3: CSS Polish

**Files:**
- Modify: `src/styles.css`

- [ ] **Step 1: Add compact section layouts**

Create responsive styles for identity notes, service chips, environment highlights, comparison places, healing pillars, detox programs, and things to do.

- [ ] **Step 2: Keep it relaxed**

Use lighter backgrounds, low-contrast borders, restrained gold labels, smaller headings inside content sections, and no nested card-heavy layout.

- [ ] **Step 3: Check mobile constraints**

Make grids collapse cleanly under `820px`; avoid text overflow and oversized type.

### Task 4: Verification

**Files:**
- Verify: `src/App.jsx`
- Verify: `src/styles.css`

- [ ] **Step 1: Build**

Run:

```powershell
rtk powershell -NoProfile -Command "`$env:PATH='C:\Users\neo16\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;' + `$env:PATH; & 'C:\Users\neo16\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --run build"
```

Expected: Vite build succeeds.

- [ ] **Step 2: Browser verify**

Open `http://127.0.0.1:5173/?motion=on` and verify:
- No missing images.
- No console errors.
- New sections are visible.
- Mobile width has no horizontal overflow.
- Final visit section still shows `+60 13-668 3113`.
