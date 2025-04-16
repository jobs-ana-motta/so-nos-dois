export function lighten(hex: string , percent: number): string {
    const num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) + Math.round((255 - (num >> 16)) * percent);
    let g = ((num >> 8) & 0x00FF) + Math.round((255 - ((num >> 8) & 0x00FF)) * percent);
    let b = (num & 0x0000FF) + Math.round((255 - (num & 0x0000FF)) * percent);
  
    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);
  
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }