# Anvelia Content Architecture Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce content weight, remove redundancy, and reorganize the Anvelia website into a relaxed visitor journey.

**Architecture:** Keep the opening scroll show emotional and cinematic. Move factual content into calm, short sections where each section answers one natural reader question.

**Tech Stack:** Vite, React, GSAP ScrollTrigger, existing Anvelia image assets, project-bound generated imagery if needed.

---

## Content Principles

- Use English for main headlines and short body copy.
- Use Chinese as quiet support: section labels, short subtitles, or paired terms.
- Avoid repeating the full service list in multiple places.
- Keep each section to one reader question.
- Use facts as proof points, not as a brochure dump.
- Prefer short cards, chips, and image-led sections over paragraphs.

## Recommended Section Order

### 1. Opening Scroll Show

**Reader question:** What does Anvelia feel like?

**Use:** Opening logo, mist transition, sanctuary hero.

**Copy weight:** Very light.

**Recommended copy:**

- Label: `ANVELIA SANCTUARY`
- Main title: `A different rhythm of living.`
- Chinese subtitle: `回归身体原本的节律`
- Body: `A mountain sanctuary for healing, rest, food, movement, and slow travel.`

**Remove from here:**

- Long list of all services.
- Facility facts.
- Program durations.

### 2. About Anvelia

**Reader question:** Where am I, and what is this place?

**Use:** `anvelia-mist-forest-transition.png` as a soft background or visual divider.

**Copy weight:** Short and grounding.

**Recommended copy:**

- Label: `我们是谁`
- Heading: `About Anvelia`
- Body: `Anvelia sits along a mountain ridge about 400 meters above sea level. It is shaped as a quiet village for natural healing, restorative stays, organic food, and slower living.`

**Merge into this section:**

- `关于安禾里`
- `海拔约400米的山脊之上`

### 3. The Anvelia Rhythm

**Reader question:** What do you provide?

**Use:** Five calm service tiles or chips.

**Copy weight:** Medium-light.

**Recommended grouping:**

- `长寿村生活方式` / `Longevity Living`
- `自然疗愈` / `Natural Healing`
- `排毒养生` / `Detox Wellness`
- `慢活旅居` / `Slow Travel`
- `身心灵成长` / `Mindful Growth`

**Remove from this section:**

- Long explanations for every item.
- Repeating the same list again in later sections.

### 4. Why This Place

**Reader question:** Why is this environment suitable for healing?

**Use:** Image-led environment section with small proof chips.

**Copy weight:** Light proof, not heavy comparison.

**Recommended copy:**

- Label: `为什么选择这里`
- Heading: `A ridge environment made for reset.`
- Body: `High greenery, low density, clean mountain air, springs, streams, and comfortable day-night temperatures create a quieter setting for recovery.`

**Proof chips:**

- `400m altitude`
- `High greenery`
- `Low density`
- `Negative-ion environment`
- `Springs and streams`
- `Comfortable day-night temperature`
- `Away from industrial pollution`

**Reduce:**

- Okinawa, Guangxi Bama, and Chiang Mai should not become a big comparison table. If used, keep one small line: `Inspired by qualities found in longevity villages and healing destinations.`

### 5. Stay, Nourish, Gather

**Reader question:** What physical spaces exist there?

**Use:** Three image-led feature blocks.

**Copy weight:** Visual first, facts second.

**Recommended blocks:**

- `Stay` / `26 healing cabins with private ritual baths and mountain terraces.`
- `Nourish` / `Organic cultivation and farm-to-table meals.`
- `Gather` / `A 4,000 sq ft open healing pavilion for retreats and circles.`

**Merge into this section:**

- 26 cabins
- Healing Pavilion
- Organic farm

### 6. Healing Programs

**Reader question:** What can I do or join?

**Use:** One clean program section with six pillars and short duration chips.

**Copy weight:** Clear, not medical-heavy.

**Recommended copy:**

- Label: `安禾里的疗愈体系`
- Heading: `Six pillars, one gentle reset.`
- Body: `Programs can be light or deep, guided by detox, nutrition, movement, sleep, meditation, and connection.`

**Six pillars:**

- `Detox`
- `Nutrition`
- `Exercise`
- `Recovery`
- `Meditation`
- `Connection`

**Program chips:**

- `2-day experience`
- `3-day cleanse`
- `5-day restore`
- `7-day reset`
- `14-day deep retreat`

### 7. Things To Do

**Reader question:** What does a stay feel like day to day?

**Use:** Blend into Healing Programs or place after it as a soft activity strip.

**Recommended list:**

- `River Walk`
- `Hot Spring Therapy`
- `Sharing Circle`
- `Liver Program`
- `Meditation`
- `Nutrition Coaching`

**Keep light:**

- Do not explain every activity yet. Use names only unless the user clicks or scrolls deeper later.

### 8. Visit

**Reader question:** How do I enquire?

**Use:** Calm final contact section.

**Copy weight:** Direct.

**Recommended copy:**

- Heading: `Plan a quiet stay.`
- Body: `Reservations are arranged by request to preserve the pace of the sanctuary.`
- Contact: `+60 13-668 3113`

## Suggested Image Needs

### Highest Priority Generated Image

Create one wide, calm section background that bridges About, Environment, and Why This Place:

`Misty tropical mountain ridge at soft dawn, layered forest, subtle timber healing cabins, open-air pavilion, organic farm terraces, stone path or stream, generous negative space for text, photorealistic editorial wellness retreat aesthetic.`

### Use Existing Images

- Opening: `anvelia-opening-logo-hero.png`
- Mist/About/Environment: `anvelia-mist-forest-transition.png`
- Hero sanctuary: `anvelia-hero-banner.png`
- Stay: `anvelia-cabin-hero.png`
- Nourish: `anvelia-farm-to-table-hero.png`
- Gather: `anvelia-auditorium-hero-v2.png`

## Implementation Notes

- Keep the opening scroll show as the emotional entrance.
- Replace heavy overview paragraphs with one calm About section and one five-part service rhythm.
- Remove the visible comparison table unless there is a strong reason to keep it.
- Make facilities image-led so the facts feel premium instead of informationally heavy.
- Keep Chinese and English paired only in labels or short subtitles; avoid long bilingual paragraphs.

