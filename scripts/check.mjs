import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  clamp,
  makeStats,
  applyDelta,
  applyChoiceDeltas,
  statName,
  evaluateStatus,
  START_STATS,
} from "../js/stats.js";
import { newState, loadState, saveState, clearState, addKnowledge, SAVE_KEY } from "../js/state.js";
import { scenariosForLevel, SCENARIOS, statKeys } from "../js/content.js";
import { levelById, LEVELS } from "../js/levels.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(root, "index.html"), "utf8");

// Static contract: every id queried by the JS must exist as an element id in index.html
const idsInHtml = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const idsFromJs = [...readFileSync(join(root, "js/ui.js"), "utf8"), readFileSync(join(root, "js/app.js"), "utf8")]
  .join("\n")
  .matchAll(/#([A-Za-z0-9_-]+)/g);
const requiredIds = [...new Set([...idsFromJs].map((m) => m[1]))];
for (const id of requiredIds) {
  assert.ok(idsInHtml.has(id), `missing element id "#${id}" in index.html`);
}

// Static contract: both screens exist
assert.match(html, /data-screen="title"/);
assert.match(html, /data-screen="map"/);

const fakeDataSelector = /data-delta="([A-Za-z0-9_-]+):(-?\d+)"/g;
const deltas = [...html.matchAll(fakeDataSelector)].map((m) => ({ key: m[1], delta: Number(m[2]) }));
assert.ok(deltas.length >= 1, "expected at least one dev delta button");
for (const { key, delta } of deltas) {
  assert.ok(Number.isFinite(delta), `bad delta for ${key}`);
  assert.ok(["dantoc", "khoahoc", "daichung", "trithuc", "daoduc", "doanket", "phucloi", "kinhte"].includes(key),
    `unknown stat key "${key}" in dev delta`);
}

assert.equal(clamp(150), 100);
assert.equal(clamp(-5), 0);
assert.equal(clamp(42), 42);

let s = makeStats();
assert.equal(s.khoahoc, START_STATS.khoahoc);
s = applyDelta(s, "khoahoc", 10);
assert.equal(s.khoahoc, START_STATS.khoahoc + 10);
s = applyDelta(s, "khoahoc", 5000);
assert.equal(s.khoahoc, 100);
assert.equal(applyDelta(s, "unknown", 10), s);
assert.equal(statName("dantoc"), "Dân tộc");
assert.equal(statName("nope"), "nope");

assert.equal(evaluateStatus(makeStats()).status, "playing");

const won = {
  dantoc: 70,
  khoahoc: 65,
  daichung: 68,
  trithuc: 55,
  daoduc: 60,
  doanket: 50,
  phucloi: 52,
  kinhte: 58,
};
assert.equal(evaluateStatus(won).status, "won");

const unbalanced = { ...won, khoahoc: 40 };
assert.equal(evaluateStatus(unbalanced).status, "playing");

const crisis = { ...won, kinhte: 5 };
assert.equal(evaluateStatus(crisis).status, "lost");

const store = new Map();
const fakeStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};

const st = newState();
assert(saveState(st, fakeStorage));
const loaded = loadState(fakeStorage);
assert.ok(loaded);
assert.deepEqual(loaded.stats, st.stats);
assert.deepEqual(loaded.completedLevels, []);

store.set(SAVE_KEY, "{nope");
assert.equal(loadState(fakeStorage), null);

assert(clearState(fakeStorage));
assert.equal(loadState(fakeStorage), null);

// Content: all 6 levels must be complete and schema-valid
const knownStatKeys = new Set(statKeys());
const knownLevelIds = new Set(LEVELS.map((l) => l.id));
const allIds = new Set();

for (const levelId of knownLevelIds) {
  assert.equal(scenariosForLevel(levelId).length, 3, `${levelId} needs 3 scenarios`);
}

for (const [levelId, scenarios] of Object.entries(SCENARIOS)) {
  assert.ok(knownLevelIds.has(levelId), `unknown level id "${levelId}"`);
  for (const scenario of scenarios) {
    assert.ok(scenario.id && !allIds.has(scenario.id), `duplicate scenario id "${scenario.id}"`);
    allIds.add(scenario.id);
    for (const field of ["title", "context", "prompt", "thesis"]) {
      assert.ok(typeof scenario[field] === "string" && scenario[field].length > 0, `${scenario.id}: missing ${field}`);
    }
    assert.ok(scenario.choices.length >= 3 && scenario.choices.length <= 4,
      `${scenario.id}: must have 3-4 choices, got ${scenario.choices.length}`);
    const correctChoices = scenario.choices.filter((c) => c.correct === true);
    assert.equal(correctChoices.length, 1, `${scenario.id}: need exactly one choice flagged correct`);
    for (const choice of scenario.choices) {
      for (const field of ["label", "hint", "explanation"]) {
        assert.ok(typeof choice[field] === "string" && choice[field].length > 0,
          `${scenario.id}: choice missing ${field}`);
      }
      if (choice.depth !== undefined) {
        assert.ok(typeof choice.depth === "string" && choice.depth.length > 0,
          `${scenario.id}: "depth" must be a non-empty string when present`);
      }
      assert.ok(typeof choice.deltas === "object" && choice.deltas !== null,
        `${scenario.id}: choice needs deltas`);
      for (const [key, delta] of Object.entries(choice.deltas)) {
        assert.ok(knownStatKeys.has(key), `${scenario.id}: unknown stat key "${key}"`);
        assert.ok(Number.isFinite(delta) && delta !== 0, `${scenario.id}: delta for ${key} must be a non-zero number`);
      }
    }
  }
}

function playAll(pick) {
  const s = newState();
  for (const level of LEVELS) {
    const scenarios = scenariosForLevel(level.id);
    assert.equal(scenarios.length, 3, `${level.id} needs 3 scenarios`);
    for (let i = 0; i < scenarios.length; i++) {
      const scenario = scenarios[i];
      const choiceIndex = pick(scenario);
      const choice = scenario.choices[choiceIndex];
      s.stats = applyChoiceDeltas(s.stats, choice.deltas);
      addKnowledge(s, {
        scenarioId: scenario.id,
        levelId: level.id,
        choiceIndex,
        thesis: scenario.thesis,
        explanation: choice.explanation,
      });
    }
    s.completedLevels.push(level.id);
    s.currentLevel = null;
  }
  return s;
}

// Flow simulation: all correct choices must win the game (balanced end state)
{
  const s = playAll((scenario) => scenario.choices.findIndex((c) => c.correct === true));

  assert.deepEqual(s.completedLevels, LEVELS.map((l) => l.id));
  assert.equal(s.knowledgeLog.length, LEVELS.length * 3);
  assert.ok(s.knowledgeLog.every((k) => k.explanation && k.thesis));
  assert.ok(s.knowledgeLog[0].id.startsWith("m1s1-"));
  assert.equal(evaluateStatus(s.stats).status, "won",
    "playing every correct choice must reach a balanced, winnable end state");
  assert.ok(Object.values(s.stats).every((v) => v >= 0 && v <= 100), "stats stay clamped");

  const m1KhoahocDelta = scenariosForLevel("m1").reduce(
    (sum, scenario) => sum + (scenario.choices.find((c) => c.correct === true).deltas.khoahoc || 0),
    0
  );
  assert.ok(m1KhoahocDelta > 0, "choosing the wide-view option in Màn 1 must raise Khoa học");

  assert(saveState(s, fakeStorage));
  const roundTrip = loadState(fakeStorage);
  assert.deepEqual(roundTrip.stats, s.stats);
  assert.deepEqual(roundTrip.completedLevels, s.completedLevels);
  assert.equal(roundTrip.knowledgeLog.length, LEVELS.length * 3);
  assert.equal(roundTrip.version, 1);
}

// Flow simulation: always picking the worst choice must not win (crisis guard)
{
  const worst = playAll((scenario) => {
    let idx = 0;
    let worstSum = Infinity;
    scenario.choices.forEach((c, i) => {
      const sum = Object.values(c.deltas).reduce((a, b) => a + b, 0);
      if (sum < worstSum) {
        worstSum = sum;
        idx = i;
      }
    });
    return idx;
  });
  assert.notEqual(evaluateStatus(worst.stats).status, "won",
    "playing every worst choice must not win the game");
}

console.log("OK - all stats, state, content & flow assertions passed");