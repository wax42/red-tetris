import React from "react";
import { GameGrid } from "./Game";
import _ from "lodash";

const Spectrum = ({ listSpectrums }) => {
  let listSpectrum = [];
  if (_.isEmpty(listSpectrum) === false) return null;
  for (let key in listSpectrums) {
    listSpectrum.push(
      <div key={key} className="spectrum-grid">
        <h1>
          {key} {listSpectrums[key]["score"]}
        </h1>
        <GameGrid grid={_.slice(listSpectrums[key]["grid"], 4)} />
      </div>
    );
  }
  return <div className="spectrum">{listSpectrum}</div>;
};

export default Spectrum;
