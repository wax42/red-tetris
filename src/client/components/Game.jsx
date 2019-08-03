import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

const mapStateToProps = state => {
  const copy_state = _.cloneDeep(state);
  return copy_state;
};

const GameGrid = props => {
  // setTimeout(() => {
  //   dispatch()
  // });
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

const GamePieces = props => {
  const pieces = props.pieces;
  return (
    <div className="game-pieces">
      {pieces.map((piece, index) => {
        return <GameGrid key={index} grid={piece} />;
      })}
    </div>
  );
};

const Game = state => {
  // state.grid
  const grid = _.slice(state.grid, 0); // 4
  const listPieces = _.slice(state.listPieces, 0); //3);
  return (
    <div className="game">
      <GameGrid grid={grid} />
      <GamePieces pieces={listPieces} />
    </div>
  );
};

export default connect(mapStateToProps)(Game);
