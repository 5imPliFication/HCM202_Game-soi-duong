import { loadState, saveState, clearState, newState, addKnowledge } from "./state.js";
import { applyDelta, applyChoiceDeltas, evaluateStatus, statName } from "./stats.js";
import { scenariosForLevel } from "./content.js";
import { levelById, LEVELS } from "./levels.js";
import {
  renderStatsHUD,
  renderStatusBanner,
  renderLevelSlots,
  renderBalance,
  renderAreaLegend,
  renderLevelScreen,
  renderExplanation,
  renderResult,
  renderKnowledgePage,
  showScreen,
  showToast,
  $,
} from "./ui.js";

let state = newState();

function persist() {
  saveState(state);
}

function renderMap() {
  renderStatsHUD(document, state.stats);
  renderStatusBanner(document, evaluateStatus(state.stats));
  renderLevelSlots(document, state);
  renderBalance(document, state);
  renderAreaLegend(document);
}

function goMap() {
  showScreen("map");
  renderMap();
}

function goTitle() {
  const hasSave = Boolean(loadState());
  $("#btn-continue").hidden = !hasSave;
  $("#btn-reset").hidden = !hasSave;
  showScreen("title");
}

function goKnowledge() {
  renderKnowledgePage(document, state);
  showScreen("knowledge");
}

function goResult(result) {
  state.status = result.status;
  persist();
  renderResult(document, result, state.stats);
  showScreen("result");
}

function startNewGame() {
  const confirmed =
    !loadState() ||
    window.confirm("Bắt đầu trò chơi mới sẽ xóa tiến trình hiện tại. Tiếp tục?");
  if (!confirmed) return;
  state = newState();
  persist();
  goMap();
}

function continueGame() {
  const saved = loadState();
  if (!saved) {
    showToast("Chưa có tiến trình đã lưu.");
    return;
  }
  state = saved;
  goMap();
}

function resetProgress() {
  if (!window.confirm("Xóa toàn bộ tiến trình đã lưu?")) return;
  clearState();
  state = newState();
  goTitle();
}

function applyDeltaFromButton(button) {
  const [key, rawDelta] = button.dataset.delta.split(":");
  const delta = Number(rawDelta);
  state.stats = applyDelta(state.stats, key, delta);
  persist();
  renderMap();
  showToast(`${statName(key)} ${delta >= 0 ? "+" : ""}${delta} → ${state.stats[key]} điểm`);
}

function startLevel(levelId) {
  const scenarios = scenariosForLevel(levelId);
  if (!scenarios.length) {
    showToast("Màn này chưa có nội dung.");
    return;
  }
  state.currentLevel = levelId;
  state.levelScenarioIndex = 0;
  persist();
  showLevelScreen();
}

function showLevelScreen() {
  const level = levelById(state.currentLevel);
  const scenarios = scenariosForLevel(state.currentLevel);
  const scenario = scenarios[state.levelScenarioIndex];
  renderLevelScreen(document, level, scenario, state.levelScenarioIndex, scenarios.length);
  showScreen("level");
}

function onChoiceClick(event) {
  const button = event.target.closest("[data-choice-index]");
  if (!button) return;
  const levelId = state.currentLevel;
  const scenarios = scenariosForLevel(levelId);
  const scenario = scenarios[state.levelScenarioIndex];
  const choiceIndex = Number(button.dataset.choiceIndex);
  const choice = scenario.choices[choiceIndex];
  if (!choice) return;

  state.stats = applyChoiceDeltas(state.stats, choice.deltas);
  addKnowledge(state, {
    scenarioId: scenario.id,
    levelId,
    choiceIndex,
    thesis: scenario.thesis,
    explanation: choice.explanation,
  });
  const outcome = evaluateStatus(state.stats);
  state.status = outcome.status;
  persist();

  const isLast = state.levelScenarioIndex >= scenarios.length - 1;
  renderExplanation(document, {
    level: levelById(levelId),
    scenario,
    choice,
    nextLabel: isLast ? "Hoàn thành màn" : "Tình huống tiếp theo →",
  });
  showScreen("explanation");
  if (outcome.status !== "playing") {
    showToast(
      outcome.status === "lost"
        ? "Một chỉ số đã suy sụt — cộng đồng đứng trước khủng hoảng."
        : "Ba trụ cột đang hài hòa — tiếp tục xây dựng!"
    );
  }
}

function onNextAfterChoice() {
  const result = evaluateStatus(state.stats);
  state.status = result.status;
  if (state.status === "lost") {
    persist();
    goResult(result);
    return;
  }
  const levelId = state.currentLevel;
  const scenarios = scenariosForLevel(levelId);
  const nextIndex = state.levelScenarioIndex + 1;
  if (nextIndex < scenarios.length) {
    state.levelScenarioIndex = nextIndex;
    persist();
    showLevelScreen();
  } else {
    completeLevel(levelId);
  }
}

function completeLevel(levelId) {
  const level = levelById(levelId);
  if (!state.completedLevels.includes(levelId)) {
    state.completedLevels.push(levelId);
  }
  state.currentLevel = null;
  state.levelScenarioIndex = 0;
  const isFinal = levelId === LEVELS[LEVELS.length - 1].id;
  persist();
  if (isFinal) {
    const result = evaluateStatus(state.stats);
    state.status = result.status;
    persist();
    goResult(result);
    return;
  }
  showToast(`Đã hoàn thành Màn ${level.index}: ${level.title}`);
  goMap();
}

function exitLevel() {
  state.currentLevel = null;
  state.levelScenarioIndex = 0;
  persist();
  goMap();
}

function onLevelSlotClick(event) {
  const button = event.target.closest("[data-level]");
  if (!button) return;
  const level = levelById(button.dataset.level);
  if (button.classList.contains("is-open")) {
    startLevel(level.id);
  } else if (button.classList.contains("is-done")) {
    showToast(`Màn ${level.index} đã hoàn thành — sẽ ôn lại trong “Kiến thức đã học”`);
  } else {
    showToast(`Hoàn thành các màn trước để mở Màn ${level.index}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("#btn-new").addEventListener("click", startNewGame);
  $("#btn-continue").addEventListener("click", continueGame);
  $("#btn-reset").addEventListener("click", resetProgress);
  $("#btn-to-title").addEventListener("click", goTitle);
  $("#btn-knowledge").addEventListener("click", goKnowledge);
  $("#btn-level-back").addEventListener("click", exitLevel);
  $("#btn-scenario-next").addEventListener("click", onNextAfterChoice);
  $("#btn-knowledge-back").addEventListener("click", goMap);
  $("#btn-knowledge-title").addEventListener("click", goTitle);
  $("#btn-result-knowledge").addEventListener("click", goKnowledge);
  $("#btn-result-map").addEventListener("click", goMap);
  $("#btn-result-restart").addEventListener("click", startNewGame);
  $("#scenario-choices").addEventListener("click", onChoiceClick);

  document.querySelectorAll("[data-delta]").forEach((button) => {
    button.addEventListener("click", () => applyDeltaFromButton(button));
  });

  $("#level-slots").addEventListener("click", onLevelSlotClick);

  const saved = loadState();
  if (saved) state = saved;
  goTitle();
});