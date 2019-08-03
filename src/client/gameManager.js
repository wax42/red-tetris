import { placePiece } from "./gridChange";
import _ from "lodash";
import { downPiece } from "./gridChange";

import eventSocket from "../common/common";
import { actionPieceDown } from "./actions/actionRoom";

export const launchGame = dispatchRoom => {
  setInterval(() => {
    dispatchRoom(actionPieceDown());
    // setState(downPiece({ ...state }));
  }, 1000);
  dispatchRoom(actionPieceDown());
  // setState(downPiece({ ...state }));
};

export const nextPiece = (state, socket) => {
  // if (state.listPieces.length < 4) {
  socket.emit(eventSocket.NEXT_PIECE);
  // }

  state.currentPiece.piece = state.listPieces.shift();
  state.currentPiece.x = 5;
  state.currentPiece.y = 0;
  console.log("NEXT PIECE LOG", JSON.stringify(state.grid));

  state.grid = placePiece(state.grid, state.currentPiece);
  console.log("NEXT PIECE LOG", JSON.stringify(state.grid));

  return state;
};

export const lineBreak = state => {
  console.log("Line break");
  let nbr_line = 0;
  state.grid = state.grid.filter(line => {
    if (_.difference(line, ["0", "."]).length === 10) {
      nbr_line++;
      return false;
    } else {
      return true;
    }
  });
  if (nbr_line !== 0) {
    state.grid.unshift(new Array(10).fill("."));
  }
  console.log(state);

  return state;
};
