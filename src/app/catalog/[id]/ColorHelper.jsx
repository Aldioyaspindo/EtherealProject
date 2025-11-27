const COLOR_MAP = {
  putih: "#ffffff",
  hitam: "#000000",
  merah: "#c20e17",
  biru: "#163eb5",
  hijau: "#1dc249",
  pink: "#c7248e",
  kuning: "#eaed2d",
  orange: "#cc541d",
  ungu: "#af1aba",
};

export const getColorCode = (color) => {
  if (!color) return "#ccc";
  
  const normalizedColor = color.toLowerCase();
  return COLOR_MAP[normalizedColor] || color || "#ccc";
};