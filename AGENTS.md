# AGENTS.md

Educational web game ("Soi Đường") for the HCM202 course (Tư tưởng Hồ Chí Minh) at FPTU. The game is **not built yet** — the repo currently contains only design docs, so work here is greenfield implementation.

## Source of truth

- Read `game-design-context-soi-duong.md` before writing any gameplay content. It is the authoritative spec (academic content, level structure, systems, win conditions). `README.md` is just a stub.

## Content rules (hard constraints)

- All user-facing text must be in Vietnamese; academic content must stay historically accurate.
- Never satirize, joke about, or distort political figures, quotes, or historical context. Do not equate culture only with festivals/áo dài/food (see §3.1 and §11).
- Not all traditions are good: let players preserve good customs while reforming/removing backward ones — never assume every tradition should stay.
- Every player choice must update stats and show a short academic explanation tying it to a specific Hồ Chí Minh thesis (§5, §11).

## Game design constraints

- 3 core stats: Dân tộc, Khoa học, Đại chúng. 5 supporting stats: Tri thức, Đạo đức, Đoàn kết, Phúc lợi, Kinh tế (§6).
- Win condition is **balance** of stats, not maximizing any single one (§6). Don't design "max out all stats" gameplay.
- Exactly 6 levels ("màn"), each teaching a specific thesis (§7).
- MVP must be plain HTML/CSS/vanilla JS — no frameworks, no build step (§12, §14). Save progress via `localStorage`. Must run on desktop and mobile browsers.

## Workflow

- Work on `dev`; `main` is stable.
- Run checks after touching logic/UI/content: `node scripts/check.mjs` (stats, state, content schema, playthrough flow) and `node scripts/render-check.mjs` (UI renderers + full app boot). Both are dependency-free node scripts — no npm install needed.
- No build tooling. Serve locally with any static server (e.g. `python3 -m http.server`) to test in a browser.