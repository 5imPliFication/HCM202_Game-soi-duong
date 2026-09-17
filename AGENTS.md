# AGENTS.md

Educational web game ("Soi Đường") for HCM202 (Tư tưởng Hồ Chí Minh), FPTU. Built with plain HTML/CSS/vanilla ES modules — no frameworks, no build step, no npm/package.json.

## Source of truth

- `game-design-context-soi-duong.md` is the authoritative spec (academic content, levels, systems, win conditions). `README.md` is a stub; `soi-duong-feedback-and-improvements.md` is a review doc, not spec.

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

## Architecture

- Entry point: `index.html` loads `js/app.js` as `<script type="module">`. `app.js` wires all events and routing on `DOMContentLoaded`; it is the only module that uses the global `document` for wiring.
- `js/stats.js` — pure stat logic, no DOM: `START_STATS`, `THRESHOLDS` (CRISIS=8, WIN_MIN=60, WIN_SPREAD=15, SUPPORT_MIN=40), `applyDelta`, `applyChoiceDeltas`, `evaluateStatus`, `computeBalance`.
- `js/state.js` — localStorage persistence. `SAVE_KEY = "soi-duong-save-v1"`, `STATE_VERSION = 1`. Bump `STATE_VERSION` to invalidate old saves. `currentLevel`/`levelScenarioIndex` form the mid-level resume point: indexed after each answer, preserved on map-exit, and re-entering a level resumes there. The map flags the in-progress level with `is-inprogress`.
- `js/levels.js` — 6 levels (`m1`–`m6`) + 5 `AREAS`. Array order is significant: it drives unlock order and which level is the final one (`LEVELS[LEVELS.length-1]`).
- `js/content.js` — all scenario content in Vietnamese. Content schema (enforced by `check.mjs`): 3 scenarios per level, 3–4 choices each, exactly one `correct: true`, deltas on known stat keys. Optional per-choice `depth` string; when present it's rendered as a collapsible "Tìm hiểu sâu hơn" box on the explanation screen.
- `js/ui.js` — all DOM renderers. Quirk: renderers take a `shell` (document-like) as first param, e.g. `renderLevelScreen(document, ...)`; only `$`, `el`, `showScreen`, `showToast` use the global `document`. Follow this pattern or `render-check.mjs` breaks.
- CSS: `css/base.css` → `css/layout.css` → `css/components.css`, in that order in `index.html`.

## Checks (run after touching logic/UI/content)

Both are dependency-free node scripts (no npm install):

- `node scripts/check.mjs` — stats/state logic, content schema, playthrough balance.
- `node scripts/render-check.mjs` — UI renderers + full app boot via a FakeElement DOM shim (programmatically clicks a full playthrough).

## Check gotchas (the scripts encode hard constraints)

- Exactly 3 scenarios/level, 3–4 choices, exactly one `correct: true`, non-zero deltas on known keys. Optional per-choice `depth` must be a non-empty string when present.
- Playing every correct choice must end `won`; every worst-choice playthrough must end `lost`. Content must satisfy the trade-off/balance win condition.
- `check.mjs` additionally requires Màn 1 correct choices to raise `khoahoc`, and at least one `data-delta` dev button (the temporary test panel in `index.html`).
- `render-check.mjs` hardcodes exact copy and constants: level titles (e.g. "Màn 1 • Hiểu về văn hóa"), save key, result titles, and `data-screen` names. Renaming any of these breaks it.
- Stat keys have two sources that must stay in sync: `STAT_DEFS` in `js/stats.js` and `STAT_KEYS` in `js/content.js`. Deltas apply via stats.js only — a key present in content.js but missing from stats.js passes `check.mjs` yet is silently ignored by `applyDelta`.
- Mid-game `lost` ends the game immediately; `won` only triggers the result at the end of the final level (Màn 6).

## Workflow

- Work on `dev`; `main` is stable.
- Run `node scripts/check.mjs`, then `node scripts/render-check.mjs`, after touching logic/UI/content.
- No build tooling. Serve over HTTP (ES modules + localStorage won't work from `file://`): e.g. `python3 -m http.server`, then open in a browser.