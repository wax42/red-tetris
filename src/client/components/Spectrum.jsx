import React from "react";
import { GameGrid } from "./Game";

const Spectrum = ({ listSpectrums }) => {
  let listSpectrum = [];
  for (let key in listSpectrums) {
    listSpectrum.push(<GameGrid grid={listSpectrums[key]["grid"]} key={key} />);
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
