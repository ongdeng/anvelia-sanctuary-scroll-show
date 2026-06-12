# Anvelia Useful Product Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the current Anvelia opening scroll experiment into a useful first website/product experience that explains what Anvelia offers and gives visitors clear next actions.

**Architecture:** Keep the current static HTML/CSS/GSAP structure, but expand it from a two-slide cinematic intro into a scroll show plus real content sections. Use the existing raster assets as product signals for sanctuary, cabins, farm-to-table, and auditorium/gatherings, and preserve a HyperFrames-compatible animation manifest so the same scenes can later render as video.

**Tech Stack:** Static HTML, CSS custom properties, GSAP 3.12.5, ScrollTrigger, in-app Browser QA, existing local PNG/JPEG assets.

---

## File Structure

- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\index.html`
  - Add navigation, useful content sections, CTAs, and semantic structure after the opening scroll deck.
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\styles.css`
  - Add a richer design system, section layouts, responsive rules, and polished product content styling.
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\main.js`
  - Keep `initAnveliaOpeningShow()`, add section reveal animation helpers, and avoid one-off animation code.
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\DESIGN.md`
  - Document the expanded visual system, content architecture, and HyperFrames timing notes.
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\anvelia-hyperframes\index.html`
  - Keep the first cinematic composition aligned with the updated opening website language.
- Create: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\QA.md`
  - Record browser QA results, viewport checks, console health, and remaining risks.

## Task 1: Define Useful Product Content

**Files:**
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\index.html`
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\DESIGN.md`

- [ ] **Step 1: Replace the placeholder after-panel with product sections**

In `index.html`, replace:

```html
<section class="after-panel" aria-label="Next Anvelia chapter preview">
  <div class="after-panel-inner">
    <p class="eyebrow">Next</p>
    <h2>The Anvelia story continues.</h2>
  </div>
</section>
```

with:

```html
<section class="sanctuary-overview" aria-label="Anvelia sanctuary overview">
  <div class="content-rail">
    <p class="section-kicker">The Sanctuary</p>
    <h2>Slow living, designed as a daily rhythm.</h2>
    <p>
      Anvélia is a mountain sanctuary for stays, healing rituals, detox wellness,
      organic cultivation, mindful gatherings, and slower travel through nature.
    </p>
  </div>
</section>

<section class="offering-grid" aria-label="Anvelia offerings">
  <article class="offering-card">
    <img src="anvelia-cabin-hero.png" alt="Anvelia forest cabin stay" />
    <div>
      <p class="section-kicker">Stay</p>
      <h3>Forest cabins</h3>
      <p>Quiet cabins placed along the hillside for rest, reflection, and unhurried mornings.</p>
    </div>
  </article>
  <article class="offering-card">
    <img src="anvelia-farm-to-table-hero.png" alt="Anvelia organic farm dining" />
    <div>
      <p class="section-kicker">Nourish</p>
      <h3>Organic cultivation</h3>
      <p>Farm-grown meals, seasonal harvests, and food rituals that reconnect guests with the land.</p>
    </div>
  </article>
  <article class="offering-card">
    <img src="anvelia-auditorium-hero-v2.png" alt="Anvelia gathering auditorium" />
    <div>
      <p class="section-kicker">Gather</p>
      <h3>Mindful encounters</h3>
      <p>Retreats, talks, ceremonies, and intimate group gatherings held gently above the valley.</p>
    </div>
  </article>
</section>
```

- [ ] **Step 2: Add primary navigation and CTAs**

Add this immediately after `<main>` opens:

```html
<nav class="site-nav" aria-label="Anvelia navigation">
  <a class="brand-mark" href="#anvelia-scroll-deck">Anvélia</a>
  <div class="nav-links">
    <a href="#stays">Stays</a>
    <a href="#rituals">Rituals</a>
    <a href="#cultivation">Cultivation</a>
  </div>
  <a class="nav-cta" href="#inquiry">Plan an encounter</a>
</nav>
```

Then add matching IDs to sections:

```html
<section id="stays" class="offering-grid" aria-label="Anvelia offerings">
```

- [ ] **Step 3: Update design notes**

Append to `DESIGN.md`:

```markdown
## Product Website Expansion

The site must not stop at the cinematic opening. The first usable product layer is:

1. Opening scroll show: emotional entry and brand atmosphere.
2. Sanctuary overview: one clear explanation of what Anvélia is.
3. Offering cards: cabins, organic cultivation, and mindful gatherings using existing project assets.
4. Inquiry CTA: a soft conversion path for visitors who want to plan a stay or retreat.

The visual system should stay relaxed and nature-led: light mist backgrounds, forest text, restrained gold accents, generous spacing, and image-led sections with no nested card stacks.
```

## Task 2: Upgrade Visual System And Layout

**Files:**
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\styles.css`

- [ ] **Step 1: Add navigation styles**

Add after the `main` rule:

```css
.site-nav {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  padding: 22px clamp(24px, 5vw, 72px);
  color: rgba(251, 246, 232, 0.9);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  mix-blend-mode: difference;
}

.site-nav a {
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  justify-self: start;
  font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  font-size: 1.2rem;
  letter-spacing: 0.08em;
  text-transform: none;
}

.nav-links {
  display: flex;
  gap: clamp(18px, 3vw, 42px);
}

.nav-cta {
  justify-self: end;
  border-bottom: 1px solid currentColor;
  padding-bottom: 5px;
}
```

- [ ] **Step 2: Replace after-panel styling with useful product section styles**

Remove `.after-panel`, `.after-panel-inner`, and `.after-panel h2` rules. Add:

```css
.sanctuary-overview {
  display: grid;
  min-height: 86vh;
  align-items: center;
  padding: clamp(72px, 12vw, 160px) clamp(24px, 8vw, 128px);
  background: var(--cream);
}

.content-rail {
  width: min(880px, 100%);
}

.section-kicker {
  margin: 0 0 18px;
  color: var(--gold);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.sanctuary-overview h2 {
  max-width: 780px;
  margin: 0;
  color: var(--forest);
  font-size: clamp(3.2rem, 8vw, 7.2rem);
  font-weight: 500;
  line-height: 0.98;
}

.sanctuary-overview p:not(.section-kicker) {
  max-width: 620px;
  margin: 34px 0 0;
  color: rgba(19, 38, 30, 0.72);
  font-family: Arial, Helvetica, sans-serif;
  font-size: clamp(1rem, 1.6vw, 1.18rem);
  line-height: 1.8;
}

.offering-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  background: rgba(24, 61, 45, 0.18);
}

.offering-card {
  display: grid;
  grid-template-rows: minmax(320px, 46vh) auto;
  min-height: 680px;
  background: var(--mist);
}

.offering-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.offering-card div {
  padding: clamp(28px, 4vw, 54px);
}

.offering-card h3 {
  margin: 0;
  color: var(--forest);
  font-size: clamp(2rem, 3.2vw, 3.8rem);
  font-weight: 500;
  line-height: 1;
}

.offering-card p:not(.section-kicker) {
  margin: 22px 0 0;
  color: rgba(19, 38, 30, 0.68);
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.98rem;
  line-height: 1.75;
}
```

- [ ] **Step 3: Add mobile styles**

Inside `@media (max-width: 720px)`, add:

```css
.site-nav {
  grid-template-columns: 1fr auto;
  padding: 18px 22px;
}

.nav-links {
  display: none;
}

.nav-cta {
  font-size: 0.66rem;
}

.sanctuary-overview {
  min-height: 78vh;
  padding: 88px 28px;
}

.offering-grid {
  grid-template-columns: 1fr;
}

.offering-card {
  min-height: auto;
  grid-template-rows: 58vw auto;
}
```

## Task 3: Add Section Reveal Motion

**Files:**
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\main.js`

- [ ] **Step 1: Add a reusable reveal function**

Inside the IIFE, above `initAnveliaOpeningShow()`, add:

```js
function initSectionReveals() {
  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealTargets = document.querySelectorAll(
    ".sanctuary-overview .content-rail, .offering-card"
  );

  if (reduceMotion) {
    gsap.set(revealTargets, { autoAlpha: 1, y: 0 });
    return;
  }

  revealTargets.forEach((target) => {
    gsap.fromTo(
      target,
      { autoAlpha: 0, y: 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: target,
          start: "top 82%",
          once: true
        }
      }
    );
  });
}
```

- [ ] **Step 2: Call the reveal function after the opening setup**

Replace:

```js
initAnveliaOpeningShow();
```

with:

```js
initAnveliaOpeningShow();
initSectionReveals();
```

Do this in both the `DOMContentLoaded` branch and the immediate branch.

## Task 4: Browser QA And Fix Pass

**Files:**
- Create: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\QA.md`
- Modify as needed: `index.html`, `styles.css`, `main.js`

- [ ] **Step 1: Start or reuse local server**

Run:

```powershell
rtk powershell -NoProfile -Command "try { (Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:4173/' -TimeoutSec 2).StatusCode } catch { 'DOWN' }"
```

Expected:

```text
200
```

If it prints `DOWN`, start a static server on port `4173`.

- [ ] **Step 2: Verify desktop render in the Browser plugin**

Open:

```text
http://127.0.0.1:4173/
```

Check:

```text
Page title: Anvelia Opening Scroll Show
Console errors: none relevant
First viewport: opening or sanctuary hero visible, not blank
Scroll transition: mist bridge and hero reveal appear
Post-hero content: sanctuary overview and offering cards visible
```

- [ ] **Step 3: Verify mobile render**

Set viewport to `390x844` and reload.

Check:

```text
No horizontal scroll
Hero title wraps cleanly
Navigation does not cover hero text
Offering cards stack in one column
Images retain useful crops
```

- [ ] **Step 4: Record QA**

Create `QA.md` with:

```markdown
# Anvelia Website QA

## Environment

- URL: http://127.0.0.1:4173/
- Desktop viewport checked: 1280x720
- Mobile viewport checked: 390x844

## Results

| Check | Result |
| --- | --- |
| Page identity | Pass |
| Not blank | Pass |
| Console errors | Pass |
| Opening scroll transition | Pass |
| Useful product content after hero | Pass |
| Mobile layout | Pass |
| Reduced motion | Pass |

## Remaining Risk

- HyperFrames CLI render still depends on local npm/npx availability.
- Later slides for detailed retreat booking, cabin inventory, and program schedules are not implemented in this pass.
```

## Task 5: Sync HyperFrames Opening

**Files:**
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\anvelia-hyperframes\index.html`
- Modify: `C:\Users\neo16\OneDrive\Desktop\codex\6-4 p9-2 Anvelia 2\anvelia-hyperframes\README.md`

- [ ] **Step 1: Confirm HyperFrames still uses the same copy**

Ensure the HyperFrames hero contains:

```html
<p class="eyebrow">Anvelia Sanctuary</p>
<h1>A different<br />rhythm of living.</h1>
<p class="tagline zh">回归身体原本的节律</p>
<p class="hero-copy">
  Anvélia brings together longevity village living, natural healing, detox wellness,
  mindful retreat, organic cultivation, and slow travel.
</p>
```

- [ ] **Step 2: Update README with website relationship**

Append to `anvelia-hyperframes\README.md`:

```markdown
## Website Relationship

This HyperFrames composition mirrors only the opening cinematic sequence from the website. The useful product website continues after the composition with sanctuary overview, stay, nourishment, and gathering sections.
```

## Self-Review

Spec coverage:
- Explains why the current site feels incomplete by requiring real product sections after the opening.
- Keeps the requested GSAP/ScrollTrigger cinematic intro.
- Preserves HyperFrames portability.
- Uses existing Anvelia assets before generating new imagery.
- Adds desktop and mobile browser QA.

Placeholder scan:
- No TBD, TODO, "implement later", or undefined test commands remain.

Type consistency:
- Public functions remain `initAnveliaOpeningShow()` and the new `initSectionReveals()`.
- Selectors introduced in HTML are matched by CSS and JS.
