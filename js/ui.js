import { STAT_DEFS, THRESHOLDS, computeBalance } from "./stats.js";
import { LEVELS, AREAS, levelById } from "./levels.js";

export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2), value);
    } else if (value === true) node.setAttribute(key, "");
    else if (value !== false && value != null) node.setAttribute(key, String(value));
  }
  node.append(...children.flat().filter((c) => c != null));
  return node;
}

export function showScreen(name) {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === name);
  });
  window.scrollTo(0, 0);
}

export function statRow(def, value) {
  const pct = Math.min(100, Math.max(0, value ?? 0));
  const crisis = value <= THRESHOLDS.CRISIS;
  const fill = el("div", { class: "stat-fill" + (crisis ? " is-crisis" : ""), style: `width:${pct}%` });
  return el(
    "div",
    { class: "stat", title: def.short },
    el("div", { class: "stat-head" },
      el("span", { class: "stat-name", text: def.name }),
      el("span", { class: "stat-value", text: String(Math.round(value ?? 0)) })
    ),
    el("div", { class: "stat-track" }, fill)
  );
}

export function renderStatsHUD(shell, stats) {
  const core = shell.querySelector("#core-stats");
  const support = shell.querySelector("#support-stats");
  const coreDefs = STAT_DEFS.filter((d) => d.group === "core");
  const supportDefs = STAT_DEFS.filter((d) => d.group === "support");
  core.replaceChildren(...coreDefs.map((d) => statRow(d, stats[d.key])));
  support.replaceChildren(...supportDefs.map((d) => statRow(d, stats[d.key])));
}

export function renderStatusBanner(shell, result) {
  const banner = shell.querySelector("#status-banner");
  const cls = result.status === "lost" ? " is-bad" : result.status === "won" ? " is-good" : "";
  banner.className = "status-banner" + cls;
  banner.replaceChildren(
    ...result.reasons.map((reason) => el("p", { text: reason }))
  );
}

export function renderLevelSlots(shell, state) {
  const wrap = shell.querySelector("#level-slots");
  const available = state.completedLevels.length;
  const doneSet = new Set(state.completedLevels);

  wrap.replaceChildren(
    ...LEVELS.map((level, index) => {
      const isDone = doneSet.has(level.id);
      const isOpen = !isDone && index <= available;
      const klass = isDone ? "is-done" : isOpen ? "is-open" : "is-locked";
      const statusText = isDone
        ? "Đã hoàn thành ✓"
        : isOpen
          ? `Mở khóa — bắt đầu Màn ${level.index}`
          : `Khóa — hoàn thành Màn ${level.index - 1} trước`;
      const button = el(
        "button",
        {
          type: "button",
          class: "level-slot " + klass,
          "data-level": level.id,
          title: `${level.thesis}\n${level.building} • Màn ${level.index}`,
          "aria-disabled": isOpen ? "false" : "true",
        },
        el("span", { class: "building-icon", text: level.icon }),
        el("span", { class: "building-label", text: `Màn ${level.index} — ${level.building}` }),
        el("span", { class: "building-name", text: level.title }),
        el("span", { class: "building-status", text: statusText })
      );
      button.disabled = !isOpen;
      return button;
    })
  );
}

export function renderBalance(shell, state) {
  const value = computeBalance(state.stats);
  const node = shell.querySelector("#balance-value");
  const klass =
    value >= 70 ? "is-good" : value >= 40 ? "is-warn" : "is-bad";
  node.textContent = `${value}/100`;
  node.classList.remove("is-good", "is-warn", "is-bad");
  node.classList.add(klass);
}

export function renderAreaLegend(shell) {
  const wrap = shell.querySelector("#area-legend");
  if (!wrap) return;
  wrap.replaceChildren(
    ...AREAS.map((area) =>
      el("span", { class: "area-tag", text: `${area.name} — ${area.desc}`, title: area.name })
    )
  );
}

export function showToast(message, duration = 2600) {
  const toast = el("div", { class: "toast", text: message });
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function renderLevelScreen(shell, level, scenario, index, total) {
  shell.querySelector("#level-h-title").textContent = `Màn ${level.index} • ${level.title}`;
  shell.querySelector("#level-progress").textContent = `Tình huống ${index + 1}/${total}`;
  shell.querySelector("#scenario-title").textContent = scenario.title;
  shell.querySelector("#scenario-context").textContent = scenario.context;
  shell.querySelector("#scenario-prompt").textContent = scenario.prompt;

  const progress = shell.querySelector("#scenario-progress");
  progress.replaceChildren(
    ...Array.from({ length: total }, (_, i) => {
      const klass = i < index ? " is-done" : i === index ? " is-current" : "";
      return el("span", { class: "dot" + klass, "aria-hidden": "true" });
    })
  );

  const choices = shell.querySelector("#scenario-choices");
  choices.replaceChildren(
    ...scenario.choices.map((choice, i) =>
      el(
        "button",
        { type: "button", class: "choice-btn", "data-choice-index": String(i) },
        el("span", { class: "choice-label", text: choice.label }),
        el("span", { class: "choice-hint", text: choice.hint })
      )
    )
  );
}

export function renderExplanation(shell, { scenario, choice, nextLabel }) {
  shell.querySelector("#explanation-title").textContent = choice.label;
  shell.querySelector("#explanation-text").textContent = choice.explanation;
  shell.querySelector("#explanation-thesis").textContent = `«${scenario.thesis}»`;
  shell.querySelector("#btn-scenario-next").textContent = nextLabel;

  const correctBadge = shell.querySelector("#explanation-correct");
  if (correctBadge) correctBadge.hidden = choice.correct !== true;

  const entries = Object.entries(choice.deltas);
  const chips = entries.map(([key, delta]) => {
    const def = STAT_DEFS.find((d) => d.key === key);
    const sign = delta > 0 ? "+" : "";
    return el(
      "span",
      { class: "delta-chip " + (delta >= 0 ? "is-up" : "is-down") },
      el("span", { text: def ? def.name : key }),
      el("strong", { text: `${sign}${delta}` })
    );
  });
  shell.querySelector("#explanation-deltas").replaceChildren(
    entries.length ? chips : el("span", { class: "delta-chip", text: "Không thay đổi chỉ số" })
  );
}

const RESULT_COPY = {
  won: {
    title: "Nền văn hóa mới đã thành hình",
    subtitle:
      "Dân tộc – khoa học – đại chúng phát triển hài hòa, các mặt đời sống đều vững vàng. Ngọn đèn của tư tưởng Hồ Chí Minh đã soi đường cho cả cộng đồng.",
    klass: "is-good",
  },
  lost: {
    title: "Văn hóa suy kiệt",
    subtitle:
      "Một mặt của đời sống cộng đồng đã suy sụp tới mức nguy kịch. Hãy bắt đầu lại, rút kinh nghiệm từ những quyết định trước.",
    klass: "is-bad",
  },
  playing: {
    title: "Chặng đường còn tiếp nối",
    subtitle:
      "Đã đi qua cả sáu màn nhưng đời sống văn hóa chưa thật cân bằng. Hãy quay lại bản đồ, xem lại các lựa chọn và tiếp tục xây dựng.",
    klass: "is-warn",
  },
};

export function renderResult(shell, result, stats) {
  const copy = RESULT_COPY[result.status] || RESULT_COPY.playing;
  const title = shell.querySelector("#result-title");
  title.textContent = copy.title;
  title.className = "result-title " + copy.klass;
  shell.querySelector("#result-subtitle").textContent = copy.subtitle;
  shell.querySelector("#result-reasons").replaceChildren(
    ...result.reasons.map((reason) => el("p", { text: reason }))
  );

  const value = computeBalance(stats);
  const balance = shell.querySelector("#result-balance-value");
  const klass = value >= 70 ? "is-good" : value >= 40 ? "is-warn" : "is-bad";
  balance.textContent = `${value}/100`;
  balance.classList.remove("is-good", "is-warn", "is-bad");
  balance.classList.add(klass);

  const coreDefs = STAT_DEFS.filter((d) => d.group === "core");
  const supportDefs = STAT_DEFS.filter((d) => d.group === "support");
  shell
    .querySelector("#result-core-stats")
    .replaceChildren(...coreDefs.map((d) => statRow(d, stats[d.key])));
  shell
    .querySelector("#result-support-stats")
    .replaceChildren(...supportDefs.map((d) => statRow(d, stats[d.key])));
}

export function renderKnowledgePage(shell, state) {
  const list = shell.querySelector("#knowledge-list");
  const empty = shell.querySelector("#knowledge-empty");
  const groups = LEVELS.map((level) => ({
    level,
    entries: state.knowledgeLog.filter((k) => k.levelId === level.id),
  })).filter((g) => g.entries.length > 0);

  if (!groups.length) {
    if (empty) empty.textContent = "Anh chưa trải qua tình huống nào. Hoàn thành các màn chơi để tích lũy kiến thức.";
    list.replaceChildren();
    return;
  }
  if (empty) empty.textContent = "";

  list.replaceChildren(
    ...groups.map(({ level, entries }) => {
      const group = el("article", { class: "knowledge-group" });
      group.append(
        el("div", { class: "knowledge-group-head" },
          el("span", { class: "knowledge-group-icon", text: level.icon }),
          el("h3", { class: "knowledge-group-title", text: `Màn ${level.index} — ${level.title} (${level.building})` })
        )
      );
      if (levelById(level.id)) {
        group.append(el("p", { class: "knowledge-group-thesis", text: `Luận điểm: ${level.thesis}` }));
      }
      entries.forEach((entry, i) => {
        group.append(
          el("div", { class: "knowledge-entry" },
            el("span", { class: "knowledge-count", text: `#${i + 1}` }),
            el("div", { class: "knowledge-entry-text" },
              el("p", { text: entry.explanation }),
              el("p", { class: "knowledge-group-thesis", text: `«${entry.thesis}»` })
            )
          )
        );
      });
      return group;
    })
  );
}