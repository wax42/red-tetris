import React from "react";
import _ from "lodash";
import { FaStar } from "react-icons/fa";

export const GameGrid = props => {
  const grid = props.grid;
  console.log("BROKENLINE", props.brokenLines);
  let brokenLines = _.map(props.brokenLines, el => {
    return el - 4;
  });
  const bubbles = new Array(59).fill(" ");

  let gameGridClass = "game-grid";
  if (!props.endOfGame && props.shakeMode) {
    gameGridClass += " shake-mode";
  }
  return (
    <div className={gameGridClass}>
      {grid.map((line, index) => {
        let brokenContainer = null;
        if (props.brokenLines !== undefined && props.brokenLines.length !== 0) {
          // console.log("JE VAIS TRIGGER BREAK ANIMATION");
          if (_.includes(brokenLines, index)) {
            // console.log("JE VAIS TRIGGER BREAK ANIMATION 2222");
            brokenContainer = (
              <div className="broken-line" key={props.key + index}>
                {_.times(59, i => (
                  <FaStar className="broken-line-box" key={i} />
                ))}
              </div>
            );
          }
        }
        return (
          <div className="line" key={index}>
            {line.map((value, index) => {
              let color = "color-form" + value;
              return <div className={`box ${color}`} key={index} />;
            })}
            {brokenContainer}
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
        return (
          <GameGrid key={index} grid={piece} brokenLines={props.brokenLines} />
        );
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
      <GameGrid
        grid={grid}
        brokenLines={state.brokenLines}
        shakeMode={state.shakeMode}
        endOfGame={state.endOfGame}
        key={state.key}
      />
      <GamePieces pieces={listPieces} brokenLines={[]} />
    </div>
  );
};

export default Game;
