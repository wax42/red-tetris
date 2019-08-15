import React from "react";
import _ from "lodash";

export const GameGrid = props => {
  const grid = props.grid;
  return (
    <div className="game-grid">
      {grid.map((line, index) => {
        return (
          <div className="line" key={index}>
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
      <GameGrid grid={grid} />
      <GamePieces pieces={listPieces} />
    </div>
  );
};

export default Game;
