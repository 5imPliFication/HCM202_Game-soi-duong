export const STATS = {
  CORE: ["dantoc", "khoahoc", "daichung"],
  SUPPORT: ["trithuc", "daoduc", "doanket", "phucloi", "kinhte"],
  MIN: 0,
  MAX: 100,
};

export const STAT_DEFS = [
  { key: "dantoc", name: "Dân tộc", group: "core", short: "Giữ gìn và phát huy bản sắc" },
  { key: "khoahoc", name: "Khoa học", group: "core", short: "Tri thức, bằng chứng, lối sống tiến bộ" },
  { key: "daichung", name: "Đại chúng", group: "core", short: "Văn hóa phục vụ đông đảo nhân dân" },
  { key: "trithuc", name: "Tri thức", group: "support", short: "Biết chữ, học tập và tiếp nhận thông tin" },
  { key: "daoduc", name: "Đạo đức", group: "support", short: "Trách nhiệm, trung thực, kỷ luật" },
  { key: "doanket", name: "Đoàn kết", group: "support", short: "Hợp tác giữa các nhóm dân cư" },
  { key: "phucloi", name: "Phúc lợi", group: "support", short: "Đời sống và dịch vụ cơ bản" },
  { key: "kinhte", name: "Kinh tế", group: "support", short: "Sản xuất và nguồn lực" },
];

export const START_STATS = {
  dantoc: 35,
  khoahoc: 22,
  daichung: 20,
  trithuc: 15,
  daoduc: 30,
  doanket: 25,
  phucloi: 15,
  kinhte: 18,
};

export const THRESHOLDS = {
  CRISIS: 8,
  WIN_MIN: 60,
  WIN_SPREAD: 15,
  SUPPORT_MIN: 40,
};

const defByKey = Object.fromEntries(STAT_DEFS.map((d) => [d.key, d]));

export function clamp(value) {
  return Math.max(STATS.MIN, Math.min(STATS.MAX, value));
}

export function makeStats(overrides = {}) {
  return { ...START_STATS, ...overrides };
}

export function applyDelta(stats, key, delta) {
  if (!defByKey[key]) return stats;
  const next = { ...stats };
  next[key] = clamp((stats[key] ?? 0) + (Number.isFinite(delta) ? delta : 0));
  return next;
}

export function applyChoiceDeltas(stats, deltas = {}) {
  let next = stats;
  for (const [key, delta] of Object.entries(deltas)) {
    if (defByKey[key] && Number.isFinite(delta)) {
      next = applyDelta(next, key, delta);
    }
  }
  return next;
}

export function statName(key) {
  return defByKey[key] ? defByKey[key].name : key;
}

export function evaluateStatus(stats) {
  const reasons = [];

  for (const def of STAT_DEFS) {
    const value = stats[def.key] ?? 0;
    if (value <= THRESHOLDS.CRISIS) {
      reasons.push(
        `«${def.name}» đang suy kiệt nghiêm trọng (${value} điểm). Cộng đồng đứng trước nguy cơ đánh mất ${def.group === "core" ? "một trong ba trụ cột dân tộc – khoa học – đại chúng" : "một mặt của đời sống"}.`
      );
    }
  }
  if (reasons.length > 0) {
    return { status: "lost", reasons };
  }

  const coreValues = STATS.CORE.map((k) => stats[k] ?? 0);
  const spread = Math.max(...coreValues) - Math.min(...coreValues);
  const coreMin = Math.min(...coreValues);
  const coreOk = coreMin >= THRESHOLDS.WIN_MIN;
  const supportOk = STATS.SUPPORT.every((k) => (stats[k] ?? 0) >= THRESHOLDS.SUPPORT_MIN);

  if (coreOk && supportOk && spread <= THRESHOLDS.WIN_SPREAD) {
    return {
      status: "won",
      reasons: [
        "Ba chỉ số cốt lõi dân tộc – khoa học – đại chúng đã phát triển hài hòa, và các mặt của đời sống đều vững vàng. Nền văn hóa mới đã soi đường cho toàn dân.",
      ],
    };
  }

  if (!coreOk) {
    const lowestKey = STATS.CORE.reduce((a, b) =>
      (stats[a] ?? 0) <= (stats[b] ?? 0) ? a : b
    );
    reasons.push(
      `Các chỉ số cốt lõi cần đạt ít nhất ${THRESHOLDS.WIN_MIN} điểm để nền văn hóa mới vững chắc (hiện thấp nhất: «${statName(lowestKey)}» ở ${stats[lowestKey]} điểm).`
    );
  }
  if (spread > THRESHOLDS.WIN_SPREAD) {
    reasons.push(
      `Chênh lệch giữa các chỉ số cốt lõi còn ${spread} điểm. Ba tính chất dân tộc, khoa học, đại chúng cần được cân bằng; riêng một chiều dễ dẫn đến bảo thủ hoặc xa rời bản sắc.`
    );
  }
  if (!supportOk) {
    reasons.push(
      `Có chỉ số hỗ trợ dưới ${THRESHOLDS.SUPPORT_MIN} điểm. Đời sống tri thức, đạo đức, đoàn kết, phúc lợi và kinh tế chưa đủ nền tảng để duy trì các công trình văn hóa.`
    );
  }

  return { status: "playing", reasons };
}

export function computeBalance(stats) {
  const core = STATS.CORE.map((k) => stats[k] ?? 0);
  const spread = Math.max(...core) - Math.min(...core);
  return Math.max(0, Math.min(100, Math.round(100 - spread * 3)));
}