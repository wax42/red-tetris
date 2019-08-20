import React from "react";
import _ from "lodash";

export const GameGrid = props => {
  const grid = props.grid;
  let brokenLines = _.map(props.brokenLines, el => {
    return el - 4;
  });

  console.log("BROKENLINE GAME GRID", props.brokenLines);
  return (
    <div className="game-grid">
      {grid.map((line, index) => {
        /* if (_.difference(line, ["0", ".", "8"]).length === 10) {
          console.log("LIGNE PLEINE");
        } */
        let lineGame = "line";

        if (props.brokenLines !== undefined && props.brokenLines.length !== 0) {
          console.log("EFFECT BEFORE INCLUDES = ", brokenLines);
          if (_.includes(brokenLines, index)) {
            console.log("EFFECT BROKE LINE SUR LIGNE: ", index);
            lineGame += " broken-line";
          }
        }
        // if (_.includes(props.brokenLine))
        return (
          <div className={lineGame} key={index}>
            {line.map((value, index) => {
              let color = "color-form" + value;
              return <div className={`box ${color}`} key={index} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const GamePieces = props => {
  const pieces = props.pieces;
  return (
    <div className="game-pieces">
      {pieces.map((piece, index) => {
        return <GameGrid key={index} grid={piece} />;
      })}
    </div>
  );
};

const Game = props => {
  const state = props.state;
  const grid = _.slice(state.grid, 4); // 4
  const listPieces = state.listPieces; //3);
  return (
    <div className="game">
      <GameGrid grid={grid} brokenLines={state.brokenLines} />
      <GamePieces pieces={listPieces} />
    </div>
  );
};

export default Game;
