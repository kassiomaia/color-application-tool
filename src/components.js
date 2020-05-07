import React, { useState } from "react";
import HSL from "./hsl";

export const Tooltip = ({ hsl }) => (
  <div
    className="tooltip"
    style={{
      position: "absolute",
      backgroundColor: "black",
      border: "1px solid gray",
      color: "white",
      padding: 5,
      zIndex: 100,
      top: 40,
      lineHeight: 2,
      width: "10em"
    }}
  >
    <small>{hsl.toString()}</small>
    <ColorGrid>
      {hsl.complementary().map((hsl, index) => (
        <ColorBox key={index} hsl={hsl} />
      ))}
    </ColorGrid>
    <br />
    <ColorGrid>
      {hsl.splitComplementary().map((hsl, index) => (
        <ColorBox key={index} hsl={hsl} />
      ))}
    </ColorGrid>
    <br />
    <ColorGrid>
      {hsl.triadic().map((hsl, index) => (
        <ColorBox key={index} hsl={hsl} />
      ))}
    </ColorGrid>
    <br />
    <ColorGrid>
      {hsl.tetradic().map((hsl, index) => (
        <ColorBox key={index} hsl={hsl} />
      ))}
    </ColorGrid>
    <br />
    <ColorGrid>
      {hsl.analagous().map((hsl, index) => (
        <ColorBox key={index} hsl={hsl} />
      ))}
    </ColorGrid>
  </div>
);

export const ColorGrid = ({ children }) => (
  <div
    className="color-grid"
    style={{
      width: "100%",
      lineHeight: 0,
      float: "left"
    }}
  >
    {children}
  </div>
);

export const ColorBoxDetail = ({ hsl, onColorSelected }) => (
  <div
    className="color-box-detail"
    style={{ display: "inline-block", textAlign: "center" }}
  >
    <div
      onClick={() => onColorSelected(hsl)}
      style={{
        position: "relative",
        display: "inline-block",
        border: "1px solid white",
        margin: 10,
        width: 48,
        height: 48,
        backgroundColor: hsl.toString()
      }}
    />
    <small style={{ padding: 10 }}>{hsl.toString()}</small>
    <small style={{ padding: 10 }}>{hsl.RGB.toString()}</small>
  </div>
);

export const ColorBox = ({
  hsl,
  width,
  height,
  onColorSelected,
  showTooltip = false
}) => {
  const [border, setBorder] = useState(`1px solid ${hsl.toString()}`);
  const [value, setValue] = useState("");

  function updateState(border, value) {
    setBorder(border);
    setValue(value);
  }

  return (
    <div
      className="color-box"
      onMouseEnter={() => updateState("1px solid black", hsl.toString())}
      onMouseLeave={() => updateState(`1px solid ${hsl.toString()}`, null)}
      onClick={() => onColorSelected && onColorSelected(hsl)}
      style={{
        position: "relative",
        display: "inline-block",
        border,
        margin: 0,
        width: width || 38,
        height: height || 38,
        backgroundColor: hsl.toString()
      }}
    >
      {showTooltip && value && <Tooltip hsl={hsl} />}
    </div>
  );
};

export const GenerateColors = ({
  from,
  to,
  step = 1,
  saturation = 1,
  lightness = 0.5,
  onColorSelected
}) =>
  Array.apply(null, Array((to - from) / step))
    .map((_, i) => i + from)
    .map(hue => new HSL({ hue: hue * step, saturation, lightness }))
    .map((hsl, index) => (
      <ColorBox
        key={index}
        hsl={hsl}
        width={28}
        height={28}
        showTooltip={false}
        onColorSelected={onColorSelected}
      />
    ));
