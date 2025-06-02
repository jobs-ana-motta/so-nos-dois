export function lighten(hex: string, percent: number): string {
  if (!hex || typeof hex !== "string" || !hex.startsWith("#")) {
    console.warn("Cor inválida recebida:", hex);
    return "#ffffff"; // fallback seguro
  }
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + Math.round((255 - (num >> 16)) * percent);
  let g =
    ((num >> 8) & 0x00ff) + Math.round((255 - ((num >> 8) & 0x00ff)) * percent);
  let b = (num & 0x0000ff) + Math.round((255 - (num & 0x0000ff)) * percent);

  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
