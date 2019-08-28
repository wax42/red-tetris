import React from "react";
import _ from "lodash";
import { FaStar } from "react-icons/fa";

export const GameGrid = props => {
  const grid = props.grid;
  let brokenLines = _.map(props.brokenLines, el => el - 4);

  let gameGridClass = props.class;
  if (!props.endOfGame && props.shakeMode) {
    gameGridClass += " shake-mode";
  }

  return (
    <div className={gameGridClass}>
      {grid.map((line, index) => {
        let brokenContainer = null;
        if (props.brokenLines !== undefined && props.brokenLines.length !== 0) {
          if (_.includes(brokenLines, index)) {
            brokenContainer = (
              <div className="broken-line" key={props.keyBrokenLines + index}>
                {_.times(100, i => (
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
        return <GameGrid class="game-grid" key={index} grid={piece} brokenLines={props.brokenLines} />;
      })}
    </div>
  );
};

const Game = props => {
  const state = props.state;
  const grid = _.slice(state.grid, 4);
  const listPieces = _.slice(state.listPieces, 0, 3);
  return (
    <div className="game">
      <GameGrid
        grid={grid}
        brokenLines={state.brokenLines}
        shakeMode={state.shakeMode}
        endOfGame={state.endOfGame}
        keyBrokenLines={state.key}
        class="game-grid"
      />
      <GamePieces pieces={listPieces} brokenLines={[]} />
    </div>
  );
};

export default Game;
