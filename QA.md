# Anvelia Vite React QA

## Environment

- Dev URL: `http://127.0.0.1:5173/?motion=on`
- Reduced-motion fallback URL: `http://127.0.0.1:5173/`
- Desktop viewport checked: `1280x720`
- Mobile viewport checked: `620x945`
- Build command: `node --run build`

## Results

| Check | Result |
| --- | --- |
| Vite production build | Pass |
| React app mounts | Pass |
| Opening logo slide | Pass, `anvelia-opening-logo-hero.png` is the first full-screen slide |
| Second hero slide | Pass, `anvelia-hero-banner.png` is the second full-screen slide with lower-left `Welcome to`, `Anvelia`, and the warm retreat tagline |
| Old rhythm section | Pass, `Five ways into a slower life.` removed |
| Section order | Pass, opening, cabins, pavilion, farm, activities, detox, visit |
| Full-slide places | Pass, 3 full-height image sections render |
| Activities layout | Pass, 5 images and 5 activity rows render |
| Detox program | Pass, 5 duration options render on a full-page section |
| Contact page | Pass, logo, `Welcome home.`, phone, and address render without the old form |
| Mobile horizontal overflow | Pass, none detected |
| Visible images | Pass, visible images loaded |
| Opening navigation | Pass, navigation is hidden during the opening deck and returns on the cabin section |

## Evidence

- Desktop screenshots saved outside the repo for review:
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-2/hero.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-2/cabins.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-2/activities.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-2/detox.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-2/contact.png`
- Mobile screenshots saved outside the repo:
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-mobile/mobile-hero-correct.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-mobile/mobile-activities.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-qa-mobile/mobile-contact.png`
- Current opening-deck screenshots saved outside the repo:
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-opening-qa/desktop-opening-logo.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-opening-qa/desktop-second-hero-banner.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-opening-qa/mobile-opening-logo.png`
  - `C:/Users/neo16/AppData/Local/Temp/anvelia-opening-qa/mobile-second-hero-banner.png`
- Browser checks confirmed 7 main sections, 3 place slides, 5 activity rows, 5 activity images, 5 detox duration options, no contact form, phone `+60 13-668 3113`, the requested address, and zero horizontal overflow.
- Current opening-deck browser logs are clean after reload.

## Tooling Notes

- The system `node.exe` exposed through WindowsApps is blocked with `Access is denied`.
- Project builds work by prepending the bundled Codex Node runtime to `PATH`.
