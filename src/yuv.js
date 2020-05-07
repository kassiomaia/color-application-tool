export default class YUV {
  constructor(y, u, v) {
    this.y = y.toFixed(2);
    this.u = u.toFixed(2);
    this.v = v.toFixed(2);
  }

  toString() {
    return `YUV(${this.y}, ${this.u}, ${this.v})`;
  }
}

// SDTV with BT.601

export function SDTVWidthBT601(rgb) {
  const Wr = 0.299;
  const Wb = 0.114;
  const Wg = 1 - Wr - Wb;
  const Umax = 0.436;
  const Vmax = 0.615;

  const Y = ({ r, g, b }) => Wr * r + Wg * g + Wb * b;
  const U = ({ r, g, b }) => Umax * ((b - Y({ r, g, b })) / (1 - Wb));
  const V = ({ r, g, b }) => Vmax * ((r - Y({ r, g, b })) / (1 - Wr));
  return new YUV(Y(rgb), U(rgb), V(rgb));
}
// HDTV with BT.709

export function HDTVwithBT709(rgb) {
  const Wr = 0.2126;
  const Wb = 0.0722;
  const Wg = 1 - Wr - Wb;
  const Umax = 0.436;
  const Vmax = 0.615;

  const Y = ({ r, g, b }) => Wr * r + Wg * g + Wb * b;
  const U = ({ r, g, b }) => Umax * ((b - Y({ r, g, b })) / (1 - Wb));
  const V = ({ r, g, b }) => Vmax * ((r - Y({ r, g, b })) / (1 - Wr));

  return new YUV(Y(rgb), U(rgb), V(rgb));
}
