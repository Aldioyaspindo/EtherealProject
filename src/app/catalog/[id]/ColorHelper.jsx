const COLOR_MAP = {
  putih: "#ffffff",
  hitam: "#000000",
  merah: "#ff0000",
  biru: "#0000ff",
  hijau: "#00ff00",
};

export const getColorCode = (color) => {
  if (!color) return "#ccc";
  
  const normalizedColor = color.toLowerCase();
  return COLOR_MAP[normalizedColor] || color || "#ccc";
};