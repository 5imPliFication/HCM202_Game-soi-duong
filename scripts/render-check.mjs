import assert from "node:assert/strict";
import {
  renderLevelScreen,
  renderExplanation,
  renderLevelSlots,
  renderBalance,
  renderAreaLegend,
  renderResult,
  renderKnowledgePage,
  showScreen,
} from "../js/ui.js";
import { scenariosForLevel } from "../js/content.js";
import { levelById, LEVELS } from "../js/levels.js";
import { makeStats } from "../js/stats.js";

class FakeElement {
  constructor(tag = "div") {
    this.tagName = tag;
    this.children = [];
    this._text = "";
    this._attrs = {};
    this.dataset = {};
    this.style = {};
    this.hidden = false;
    this._cls = new Set();
    this._events = {};
    this.className = "";
  }

  _sync() {
    this.className = [...this._cls].join(" ");
  }

  set className(v) {
    this._cls = new Set(String(v).split(/\s+/).filter(Boolean));
    this._className = [...this._cls].join(" ");
  }

  get className() {
    return this._className || "";
  }

  get classList() {
    return {
      add: (c) => { this._cls.add(c); this._sync(); },
      remove: (c) => { this._cls.delete(c); this._sync(); },
      toggle: (c, force) => {
        const has = this._cls.has(c);
        const want = force === undefined ? !has : force;
        want ? this._cls.add(c) : this._cls.delete(c);
        this._sync();
        return want;
      },
      contains: (c) => this._cls.has(c),
    };
  }

  setAttribute(k, v) {
    this._attrs[k] = String(v);
    if (k.startsWith("data-")) {
      const key = k.slice(5).replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      this.dataset[key] = String(v);
    }
  }

  getAttribute(k) {
    return this._attrs[k];
  }

  set textContent(v) {
    this._text = String(v);
  }

  get textContent() {
    return this._text;
  }

  append(...nodes) {
    nodes.filter((n) => n != null).forEach((n) => {
      n.__parent = this;
      this.children.push(n);
    });
  }

  replaceChildren(...nodes) {
    this.children = nodes.filter((n) => n != null);
    this.children.forEach((n) => (n.__parent = this));
  }

  closest(sel) {
    let node = this;
    while (node) {
      const attr = /^\[([^=\]]+)(?:="?([^"\]]*)"?)?\]$/.exec(sel);
      const cls = /^\.([\w-]+)$/.exec(sel);
      if (attr && node._attrs[attr[1]] !== undefined) return node;
      if (cls && node._cls.has(cls[1])) return node;
      if (sel === "button" && node.tagName === "BUTTON") return node;
      node = node.__parent || null;
    }
    return null;
  }

  addEventListener(type, fn) {
    (this._events[type] ||= []).push(fn);
  }

  appendChild(node) {
    this.append(node);
    return node;
  }

  remove() {}
}

globalThis.window = { scrollTo() {}, confirm: () => true };
globalThis.requestAnimationFrame = (cb) => cb();
globalThis.document = {
  createElement: (t) => new FakeElement(t),
  querySelector: () => null,
  querySelectorAll: () => [],
  body: new FakeElement("body"),
};

const stubs = new Map();
function stub(selector) {
  if (!stubs.has(selector)) stubs.set(selector, new FakeElement());
  return stubs.get(selector);
}
const shell = { querySelector: (s) => stub(s) };

const scenario = scenariosForLevel("m1")[0];
const level = levelById("m1");

renderLevelScreen(shell, level, scenario, 0, 3);
assert.equal(stub("#level-h-title").textContent, "Màn 1 • Hiểu về văn hóa");
assert.equal(stub("#level-progress").textContent, "Tình huống 1/3");
assert.equal(stub("#scenario-title").textContent, scenario.title);
assert.equal(stub("#scenario-context").textContent, scenario.context);
assert.equal(stub("#scenario-prompt").textContent, scenario.prompt);
const dots = stub("#scenario-progress").children;
assert.equal(dots.length, 3);
assert.ok(dots[0].classList.contains("is-current"));
const choiceButtons = stub("#scenario-choices").children;
assert.equal(choiceButtons.length, scenario.choices.length);
assert.equal(choiceButtons[0].dataset.choiceIndex, "0");
assert.equal(choiceButtons[0].children[0].textContent, scenario.choices[0].label);

renderExplanation(shell, {
  level,
  scenario,
  choice: scenario.choices[1],
  nextLabel: "Tình huống tiếp theo →",
});
assert.equal(stub("#explanation-title").textContent, scenario.choices[1].label);
assert.equal(stub("#explanation-text").textContent, scenario.choices[1].explanation);
assert.ok(stub("#explanation-thesis").textContent.includes(scenario.thesis));
assert.equal(stub("#btn-scenario-next").textContent, "Tình huống tiếp theo →");
const chips = stub("#explanation-deltas").children;
assert.equal(chips.length, Object.keys(scenario.choices[1].deltas).length);
assert.ok(chips[0].classList.contains("is-up"));
chips.forEach((chip) => {
  assert.ok(chip.children[0], "chip has a stat name");
  assert.match(chip.children[0].textContent, /^[\p{L} ]+$/u, "chip shows a clean stat name, not a stringified element");
  assert.match(chip.children[1].textContent, /^[+-]\d+$/, "chip shows a numeric delta, not a stringified element");
});
const correctChoice = scenario.choices.find((c) => c.correct === true);
const wrongChoice = scenario.choices.find((c) => c.correct !== true);
renderExplanation(shell, { level, scenario, choice: correctChoice, nextLabel: "Tiếp →" });
assert.equal(stub("#explanation-correct").hidden, false, "correct choice shows the badge");
renderExplanation(shell, { level, scenario, choice: wrongChoice, nextLabel: "Tiếp →" });
assert.equal(stub("#explanation-correct").hidden, true, "wrong choice hides the badge");

const deepChoice = correctChoice.depth ? correctChoice : wrongChoice;
if (deepChoice.depth) {
  renderExplanation(shell, { level, scenario, choice: deepChoice, nextLabel: "Tiếp →" });
  const depthNodes = stub("#explanation-depth").children;
  assert.equal(depthNodes.length, 1, "choice with depth renders a details box");
  assert.ok(depthNodes[0].classList.contains("depth-dive"));
  assert.equal(depthNodes[0].children[0].textContent, "Tìm hiểu sâu hơn");
  assert.ok(depthNodes[0].children[1].textContent.includes(deepChoice.depth), "depth body shows the deep text");
}
const noDepth = scenario.choices.find((c) => c.depth === undefined);
assert.ok(noDepth, "m1 has a choice without depth");
renderExplanation(shell, { level, scenario, choice: noDepth, nextLabel: "Tiếp →" });
assert.equal(stub("#explanation-depth").children.length, 0, "no depth box when choice has no depth");

renderResult(shell, {
  status: "won",
  reasons: ["Ba chỉ số cốt lõi đã phát triển hài hòa."],
}, { dantoc: 66, khoahoc: 68, daichung: 67, trithuc: 60, daoduc: 52, doanket: 49, phucloi: 52, kinhte: 48 });
assert.equal(stub("#result-title").textContent, "Nền văn hóa mới đã thành hình");
assert.ok(stub("#result-title").classList.contains("is-good"));
assert.equal(stub("#result-reasons").children.length, 1);
assert.equal(stub("#result-core-stats").children.length, 3);
assert.equal(stub("#result-support-stats").children.length, 5);
assert.match(stub("#result-balance-value").textContent, /^94\/100$/);

renderResult(shell, {
  status: "lost",
  reasons: ["«Tri thức» đang suy kiệt nghiêm trọng."],
}, makeStats({ trithuc: 5 }));
assert.equal(stub("#result-title").textContent, "Văn hóa suy kiệt");
assert.ok(stub("#result-title").classList.contains("is-bad"));

renderResult(shell, {
  status: "playing",
  reasons: ["Chênh lệch giữa các chỉ số cốt lõi còn lớn."],
}, makeStats());
assert.equal(stub("#result-title").textContent, "Chặng đường còn tiếp nối");
assert.ok(stub("#result-title").classList.contains("is-warn"));

renderKnowledgePage(shell, {
  knowledgeLog: [
    {
      id: "m1s1-1",
      levelId: "m1",
      thesis: "Văn hóa có nghĩa rộng, hiện diện trong toàn bộ đời sống.",
      explanation: "Học tập, đạo đức, lao động đều là biểu hiện văn hóa.",
    },
    {
      id: "m2s1-3",
      levelId: "m2",
      thesis: "Giáo dục nâng cao dân trí, xây dựng con người mới.",
      explanation: "Ai biết chữ dạy người chưa biết chữ.",
    },
  ],
});
assert.equal(stub("#knowledge-empty").textContent, "");
const knowledgeGroups = stub("#knowledge-list").children;
assert.equal(knowledgeGroups.length, 2);
assert.ok(knowledgeGroups[0].className.includes("knowledge-group"));
assert.ok(knowledgeGroups[0].children[0].children[1].textContent.includes("Màn 1"));
assert.ok(knowledgeGroups[0].children[1].textContent.includes(levelById("m1").thesis), "group shows level thesis");
assert.equal(
  knowledgeGroups[0].children[2].children[1].children[1].textContent.includes("Văn hóa có nghĩa rộng, hiện diện trong toàn bộ đời sống."),
  true
);

renderKnowledgePage(shell, { knowledgeLog: [] });
assert.equal(stub("#knowledge-list").children.length, 0);
assert.equal(stub("#knowledge-empty").textContent.length > 0, true);

renderLevelSlots(shell, { completedLevels: [] });
const buildingSlots = stub("#level-slots").children;
assert.equal(buildingSlots.length, 6);
assert.ok(buildingSlots[0].classList.contains("is-open"));
assert.ok(buildingSlots[1].classList.contains("is-locked"));
const slot0 = buildingSlots[0].children;
assert.equal(slot0[0].className.includes("building-icon"), true);
assert.equal(slot0[1].className.includes("building-label"), true);
assert.ok(slot0[1].textContent.includes(levelById("m1").building));
assert.equal(slot0[2].className.includes("building-name"), true);
assert.equal(slot0[2].textContent, levelById("m1").title);
assert.ok(slot0[3].className.includes("building-status"), true);

renderBalance(shell, { stats: { dantoc: 60, khoahoc: 60, daichung: 60 } });
assert.match(stub("#balance-value").textContent, /^100\/100$/);
assert.ok(stub("#balance-value").classList.contains("is-good"));
renderBalance(shell, { stats: { dantoc: 60, khoahoc: 20, daichung: 90 } });
assert.match(stub("#balance-value").textContent, /^\d+\/100$/);
assert.ok(stub("#balance-value").classList.contains("is-bad"));

renderAreaLegend(shell);
const legendTags = stub("#area-legend").children;
assert.equal(legendTags.length, 5);
assert.ok(legendTags[0].classList.contains("area-tag"));

const titleScreen = new FakeElement("section");
titleScreen.setAttribute("data-screen", "title");
const mapScreen = new FakeElement("section");
mapScreen.setAttribute("data-screen", "map");
const screens = [titleScreen, mapScreen];
document.querySelectorAll = (sel) => (sel === ".screen" ? screens : []);
showScreen("map");
assert.ok(mapScreen.classList.contains("active"));
assert.ok(!titleScreen.classList.contains("active"));

// --- Integration: boot app.js through the shim and play Màn 1 ---
globalThis.setTimeout = (fn) => { fn(); return 0; };
globalThis.localStorage = {
  store: new Map(),
  getItem(k) {
    return this.store.has(k) ? this.store.get(k) : null;
  },
  setItem(k, v) {
    this.store.set(k, String(v));
  },
  removeItem(k) {
    this.store.delete(k);
  },
};

const appScreens = [];
function appScreen(name) {
  const s = new FakeElement("section");
  s.setAttribute("data-screen", name);
  appScreens.push(s);
  return s;
}
appScreen("title");
appScreen("level");
appScreen("explanation");
appScreen("map");
appScreen("result");
appScreen("knowledge");

const autoStubs = new Map();
function autoStub(sel) {
  if (!autoStubs.has(sel)) autoStubs.set(sel, new FakeElement("div"));
  return autoStubs.get(sel);
}

document.querySelector = (sel) => autoStub(sel);
document.querySelectorAll = (sel) =>
  sel === ".screen" ? appScreens : sel === "[data-delta]" ? [] : [];
document.addEventListener = (type, fn) => {
  if (type === "DOMContentLoaded") fn();
};

function click(node) {
  let current = node;
  while (current) {
    const listeners = current._events.click || [];
    for (const fn of listeners) fn({ target: node, currentTarget: current });
    current = current.__parent || null;
  }
}

await import("../js/app.js");

const saved = () => JSON.parse(localStorage.getItem("soi-duong-save-v1"));

assert.ok(appScreens[0].classList.contains("active"), "title active after boot");
click(autoStub("#btn-new"));
assert.ok(appScreens[3].classList.contains("active"), "map active after new game");
assert.equal(saved().currentLevel, null);

const slots = () => autoStub("#level-slots").children;
assert.equal(slots().length, 6);
assert.ok(slots()[0].classList.contains("is-open"));
assert.ok(slots()[1].classList.contains("is-locked"));
assert.match(autoStub("#balance-value").textContent, /^\d+\/100$/);
assert.equal(autoStub("#area-legend").children.length, 5);

click(slots()[0]);
assert.ok(appScreens[1].classList.contains("active"), "level screen active");
assert.equal(autoStub("#level-h-title").textContent, "Màn 1 • Hiểu về văn hóa");
assert.equal(autoStub("#level-progress").textContent, "Tình huống 1/3");
assert.equal(saved().currentLevel, "m1");

const scenarios = scenariosForLevel("m1");
for (let step = 0; step < 3; step++) {
  const scenario = scenarios[step];
  assert.equal(autoStub("#scenario-title").textContent, scenario.title);
  const choices = autoStub("#scenario-choices").children;
  const picked = choices[0];
  assert.equal(picked.dataset.choiceIndex, "0");
  click(picked);
  assert.ok(appScreens[2].classList.contains("active"), "explanation screen active");
  assert.equal(autoStub("#explanation-title").textContent, scenario.choices[0].label);
  assert.ok(saved().knowledgeLog.length === step + 1, "knowledge recorded per scenario");
  click(autoStub("#btn-scenario-next"));
}
assert.ok(appScreens[3].classList.contains("active"), "back on map after finishing");
assert.deepEqual(saved().completedLevels, ["m1"]);
assert.equal(saved().currentLevel, null);
assert.equal(saved().knowledgeLog.length, 3);
assert.ok(slots()[0].classList.contains("is-done"));
assert.ok(slots()[1].classList.contains("is-open"), "Màn 2 unlocked after Màn 1");
assert.ok(slots()[0].disabled, "completed level no longer starts");
assert.ok(slots()[0].children[0].classList.contains("building-icon"));

function clickChoice(scenario, pick) {
  const targetIndex = pick(scenario);
  const buttons = autoStub("#scenario-choices").children;
  const button = buttons.find((b) => Number(b.dataset.choiceIndex) === targetIndex);
  assert.ok(button, `found choice ${targetIndex} for ${scenario.id}`);
  click(button);
  click(autoStub("#btn-scenario-next"));
}

// Full playthrough with all correct choices must end in the won result screen
click(autoStub("#btn-new"));
assert.ok(appScreens[3].classList.contains("active"), "map active after new game");
for (const level of LEVELS) {
  const slot = autoStub("#level-slots").children.find((s) => s.dataset.level === level.id);
  click(slot);
  assert.ok(appScreens[1].classList.contains("active"), `level screen for ${level.id}`);
  for (const scenario of scenariosForLevel(level.id)) {
    clickChoice(scenario, (sc) => sc.choices.findIndex((c) => c.correct === true));
  }
}
assert.ok(appScreens[4].classList.contains("active"), "result screen after finishing all levels");
assert.equal(autoStub("#result-title").textContent, "Nền văn hóa mới đã thành hình");
assert.equal(saved().status, "won");
assert.equal(saved().knowledgeLog.length, LEVELS.length * 3);
assert.equal(autoStub("#result-core-stats").children.length, 3);
assert.equal(autoStub("#result-support-stats").children.length, 5);

// From the result screen, the knowledge page lists all 6 levels
click(autoStub("#btn-result-knowledge"));
assert.ok(appScreens[5].classList.contains("active"), "knowledge screen active after result");
assert.equal(autoStub("#knowledge-list").children.length, 6);
assert.equal(autoStub("#knowledge-empty").textContent, "");
assert.ok(autoStub("#knowledge-list").children[0].children[0].children[1].textContent.includes("Màn 1"));
click(autoStub("#btn-knowledge-back"));
assert.ok(appScreens[3].classList.contains("active"), "back to map from knowledge");
click(autoStub("#btn-knowledge"));
assert.ok(appScreens[5].classList.contains("active"), "knowledge reachable from map footer");
click(autoStub("#btn-knowledge-title"));
assert.ok(appScreens[0].classList.contains("active"), "title reachable from knowledge");

// Worst-choice playthrough must end in the lost result screen
click(autoStub("#btn-new"));
assert.ok(appScreens[3].classList.contains("active"), "map active after restart");
outer: for (const level of LEVELS) {
  const slot = autoStub("#level-slots").children.find((s) => s.dataset.level === level.id);
  click(slot);
  for (const scenario of scenariosForLevel(level.id)) {
    clickChoice(scenario, (sc) => {
      let idx = 0;
      let worstSum = Infinity;
      sc.choices.forEach((c, i) => {
        const sum = Object.values(c.deltas).reduce((a, b) => a + b, 0);
        if (sum < worstSum) {
          worstSum = sum;
          idx = i;
        }
      });
      return idx;
    });
    if (appScreens[4].classList.contains("active")) break outer;
  }
}
assert.ok(appScreens[4].classList.contains("active"), "lost result screen reached");
assert.equal(autoStub("#result-title").textContent, "Văn hóa suy kiệt");
assert.equal(saved().status, "lost");

// Mid-level exit must be saved so re-entering resumes at the next scenario
click(autoStub("#btn-new"));
click(autoStub("#level-slots").children[0]);
const resumeScenarios = scenariosForLevel("m1");
click(autoStub("#scenario-choices").children[0]);
assert.ok(appScreens[2].classList.contains("active"), "explanation active before exit");
assert.equal(saved().levelScenarioIndex, 1, "answering scenario 0 advances the saved progress");
click(autoStub("#btn-level-back"));
assert.ok(appScreens[3].classList.contains("active"), "map active after mid-level exit");
assert.equal(saved().currentLevel, "m1", "in-progress level preserved on exit");
assert.ok(
  autoStub("#level-slots").children[0].classList.contains("is-inprogress"),
  "map flags the in-progress level"
);
click(autoStub("#level-slots").children[0]);
assert.ok(appScreens[1].classList.contains("active"), "level screen active after re-entry");
assert.equal(autoStub("#scenario-title").textContent, resumeScenarios[1].title, "resumes at the second scenario");
assert.equal(autoStub("#level-progress").textContent, "Tình huống 2/3", "progress label reflects resume point");

console.log("OK - UI render, router & end-to-end boot checks passed");