import React from "react";
import { GameGrid } from "./Game";
import _ from "lodash";
import { FaTrophy } from "react-icons/fa";

const Spectrum = ({ listSpectrums }) => {
  let listSpectrum = [];
  if (_.isEmpty(listSpectrum) === false) return null;
  for (let key in listSpectrums) {
    let classLose = "";
    if (listSpectrums[key]["lose"] === true) {
      classLose = "spectrum-lose";
    }
    listSpectrum.push(
      <div key={key} style={{ padding: "30px" }}>
        <div className={`spectrum-info ${classLose}`}>
          <div>{key}</div>

          <div>
            <FaTrophy /> {listSpectrums[key]["score"]}
          </div>
        </div>
        <GameGrid class="spectrum-grid" grid={_.slice(listSpectrums[key]["grid"], 4)} />
      </div>
    );
  }
  return <div className="spectrum">{listSpectrum}</div>;
};

export default Spectrum;
