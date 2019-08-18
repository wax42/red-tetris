import React from "react";
import _ from "lodash";

export const GameGrid = props => {

  // console.log("PROPS GAME GRID ", props);


  const grid = props.grid;
  return (
    <div className="game-grid">
      {grid.map((line, index) => {
        if (_.difference(line, ["0", ".", "8"]).length === 10) {
          console.log("LIGNE PLEINE");
        }
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
<<<<<<< HEAD
  // console.log("GAME PROPS: ", props);
=======
  console.log("GAME PROPS: ", props);
>>>>>>> f7197c486305d5c3230e80f9f6f5ae53296159b9
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
