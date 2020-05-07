import { SDTVWidthBT601 } from "./yuv";

export default class RGB {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  toString() {
    return `RGB(${this.r}, ${this.g}, ${this.b})`;
  }

  get YUV() {
    return SDTVWidthBT601(this);
  }
}
