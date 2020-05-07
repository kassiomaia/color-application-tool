import RGB from "./rgb";

export default class HSL {
  constructor({ hue, saturation, lightness }) {
    this.hue = hue;
    this.saturation = saturation;
    this.lightness = lightness;
  }

  toString() {
    const hue = Math.round(this.hue);
    const saturation = Math.round(this.saturation * 100);
    const lightness = Math.round(this.lightness * 100);
    return `HSL(${hue}, ${saturation}%, ${lightness}%)`;
  }

  get RGB() {
    if (this.saturation === 0) {
      const tone = this.lightness * 255;
      return new RGB(tone, tone, tone);
    }

    const A =
      this.lightness < 0.5
        ? this.lightness * (1.0 + this.saturation)
        : this.lightness + this.saturation - this.lightness * this.saturation;

    const B = 2 * this.lightness - A;
    const HUE = this.hue / 360;

    const [r, g, b] = [HUE + 0.333, HUE, HUE - 0.333]
      .map(rate => {
        if (rate < 0) return rate + 1;
        if (rate > 1) return rate - 1;
        return rate;
      })
      .map(rate => {
        if (6 * rate < 1) return (B + (A - B)) * 6 * rate;
        if (2 * rate < 1) return A;
        if (3 * rate < 2) return (B + (A - B)) * (0.666 - rate) * 6;
        return B;
      })
      .map(color => Math.round(color * 255));

    return new RGB(r, g, b);
  }

  get YUV() {
    return this.RGB.YUV;
  }

  get complementary() {
    return [
      new HSL({
        hue: this.hue + 180 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      })
    ];
  }

  get splitComplementary() {
    return [
      new HSL({
        hue: this.hue + 150 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue + 210 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      })
    ];
  }

  get triadic() {
    return [
      new HSL({
        hue: this.hue + 120 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue + 240 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      })
    ];
  }

  get tetradic() {
    return [
      new HSL({
        hue: this.hue + 90 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue + 180 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue + 270 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      })
    ];
  }

  get analagous() {
    return [
      new HSL({
        hue: this.hue + 30 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue + 60 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue + 90 - 360,
        saturation: this.saturation,
        lightness: this.lightness
      })
    ];
  }

  get personal() {
    return [
      new HSL({
        hue: this.hue - 10,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 20,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 30,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 40,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 50,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 60,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 70,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 80,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 90,
        saturation: this.saturation,
        lightness: this.lightness
      }),
      new HSL({
        hue: this.hue - 100,
        saturation: this.saturation,
        lightness: this.lightness
      })
    ];
  }
}
