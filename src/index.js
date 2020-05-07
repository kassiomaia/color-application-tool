import React, { useState } from "react";
import ReactDOM from "react-dom";

import {
  ColorGrid,
  ColorBoxDetail,
  GenerateColors,
  ColorBox
} from "./components";
import HSL from "./hsl";

import "./styles.css";

const ColorCombinations = ({ hsl, onColorSelected }) => (
  <div className="color-combination">
    <label>Color Combinations</label>
    {hsl && (
      <ColorGrid>
        <ColorBoxDetail hsl={hsl} onColorSelected={onColorSelected} />
        {hsl.personal.map((hsl, index) => (
          <ColorBoxDetail key={`analagous-${index}`} hsl={hsl} />
        ))}

        {hsl.tetradic.map((hsl, index) => (
          <ColorBoxDetail
            key={`tetradic-${index}`}
            hsl={hsl}
            onColorSelected={onColorSelected}
          />
        ))}

        {hsl.triadic.map((hsl, index) => (
          <ColorBoxDetail key={`triadic-${index}`} hsl={hsl} />
        ))}

        {hsl.splitComplementary.map((hsl, index) => (
          <ColorBoxDetail key={`split-complementary-${index}`} hsl={hsl} />
        ))}

        {hsl.complementary.map((hsl, index) => (
          <ColorBoxDetail key={`complementary-${index}`} hsl={hsl} />
        ))}
      </ColorGrid>
    )}
  </div>
);

const LightnessLevels = ({ hsl }) =>
  Array.apply(null, Array(hsl ? 100 : 0))
    .map((_, index) => index / 100)
    .reverse()
    .map(
      lightness =>
        new HSL({ hue: hsl.hue, saturation: hsl.saturation, lightness })
    );

const State = ({ children }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  return children({ selectedColor, setSelectedColor });
};

ReactDOM.render(
  <React.StrictMode>
    <State>
      {({ selectedColor, setSelectedColor }) => (
        <div className="application">
          <div className="header">
            <h1>Color Application</h1>
          </div>
          <div className="content">
            <ColorGrid>
              <GenerateColors
                onColorSelected={setSelectedColor}
                saturation={0.5}
                from={0}
                to={360}
                step={0.5}
              />
            </ColorGrid>
          </div>
          <div className="lightness-levels">
            {LightnessLevels({ hsl: selectedColor }).map((hsl, index) => (
              <ColorBox
                key={`${index}-${hsl.toString()}`}
                height={5}
                hsl={hsl}
              />
            ))}
          </div>
          <ColorCombinations
            hsl={selectedColor}
            onColorSelected={setSelectedColor}
          />
        </div>
      )}
    </State>
  </React.StrictMode>,
  document.getElementById("root")
);
