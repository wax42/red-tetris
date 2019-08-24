import React from "react";
import { GameGrid } from "./Game";
import _ from "lodash";

const Spectrum = ({ listSpectrums }) => {
  let listSpectrum = [];
  for (let key in listSpectrums) {
    listSpectrum.push(
      <div key={key} className="spectrum-grid">
        <h1>
          {key} {listSpectrums[key]["score"]}
        </h1>
        <GameGrid
          grid={_.slice(listSpectrums[key]["grid"], 4)} //T Check with the team
        />
      </div>
    );
  }
  return (
    <div className="spectrum">
      {listSpectrum} {/* {listSpect.map(spectrum => ( */}
      {/* <GameGrid grid={spectrum.grid} /> */}
      {/* ))} */}
    </div>
  );
};

export default Spectrum;
