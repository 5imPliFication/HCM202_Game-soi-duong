import { makeStats, START_STATS } from "./stats.js";

export const SAVE_KEY = "soi-duong-save-v1";
export const STATE_VERSION = 1;

export function newState() {
  return {
    version: STATE_VERSION,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    stats: makeStats(START_STATS),
    completedLevels: [],
    currentLevel: null,
    levelScenarioIndex: 0,
    unlockedBuildings: [],
    knowledgeLog: [],
    status: "playing",
  };
}

export function addKnowledge(state, entry) {
  state.knowledgeLog.push({
    id: `${entry.scenarioId}-${entry.choiceIndex}`,
    levelId: entry.levelId,
    thesis: entry.thesis,
    explanation: entry.explanation,
  });
}

export function loadState(storage = globalThis.localStorage) {
  if (!storage) return null;
  try {
    const raw = storage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || parsed.version !== STATE_VERSION) {
      return null;
    }
    const state = { ...newState(), ...parsed };
    state.stats = { ...makeStats(), ...(parsed.stats || {}) };
    return state;
  } catch {
    return null;
  }
}

export function saveState(state, storage = globalThis.localStorage) {
  if (!storage) return false;
  try {
    state.updatedAt = Date.now();
    storage.setItem(SAVE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function clearState(storage = globalThis.localStorage) {
  if (!storage) return false;
  try {
    storage.removeItem(SAVE_KEY);
    return true;
  } catch {
    return false;
  }
}