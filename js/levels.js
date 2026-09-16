export const AREAS = [
  { key: "tam-ly", name: "Xây dựng tâm lý", desc: "Tinh thần độc lập, tự cường" },
  { key: "luan-ly", name: "Xây dựng luân lý", desc: "Hy sinh, sống có trách nhiệm" },
  { key: "xa-hoi", name: "Xây dựng xã hội", desc: "Phúc lợi nhân dân" },
  { key: "chinh-tri", name: "Xây dựng chính trị", desc: "Dân quyền, quyền làm chủ" },
  { key: "kinh-te", name: "Xây dựng kinh tế", desc: "Sản xuất, đời sống vật chất" },
];

export const LEVELS = [
  {
    id: "m1",
    index: 1,
    title: "Hiểu về văn hóa",
    thesis: "Văn hóa có nghĩa rộng, hiện diện trong toàn bộ đời sống.",
    building: "Trung tâm thông tin",
    icon: "📡",
    accent: "#c99738",
    area: "tam-ly",
  },
  {
    id: "m2",
    index: 2,
    title: "Chống giặc dốt",
    thesis: "Giáo dục nâng cao dân trí, xây dựng con người mới.",
    building: "Trường học",
    icon: "🏫",
    accent: "#51733f",
    area: "luan-ly",
  },
  {
    id: "m3",
    index: 3,
    title: "Giữ gìn bản sắc",
    thesis: "Giữ gìn truyền thống tốt đẹp, đồng thời loại bỏ yếu tố lạc hậu.",
    building: "Đình làng",
    icon: "🏛️",
    accent: "#a3382a",
    area: "xa-hoi",
  },
  {
    id: "m4",
    index: 4,
    title: "Khoa học hóa đời sống",
    thesis: "Tư duy khoa học và bằng chứng giúp đời sống tiến bộ.",
    building: "Trạm y tế",
    icon: "🏥",
    accent: "#3f7c8c",
    area: "chinh-tri",
  },
  {
    id: "m5",
    index: 5,
    title: "Văn hóa cho mọi người",
    thesis: "Văn hóa thuộc về nhân dân và phục vụ nhân dân.",
    building: "Thư viện",
    icon: "📖",
    accent: "#8a6d3b",
    area: "kinh-te",
  },
  {
    id: "m6",
    index: 6,
    title: "Cộng đồng cân bằng",
    thesis: "Xây dựng nền văn hóa mới là quá trình toàn diện, không tách rời các mặt của đời sống.",
    building: "Nhà văn hóa",
    icon: "🏛️",
    accent: "#a3382a",
    area: null,
  },
];

export function levelById(id) {
  return LEVELS.find((l) => l.id === id) || null;
}