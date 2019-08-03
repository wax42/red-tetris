import { placePiece } from "./gridChange";
import _ from "lodash";

import eventSocket from "../../common/common";

export const startGame = state => {
  // TODO initialise the state with socket connection
  //   const dispatch = useDispatch();
  //   dispatch(actionPieceDown());

  return state;
};

export const nextPiece = state => {
  console.log("CONSOLE LOG");
  // if (state.listPieces.length < 4) {
  // state.socket.emit(eventSocket.NEXT_PIECE);
  // }

  state.currentPiece.piece = state.listPieces.shift();
  state.currentPiece.x = 5;
  state.currentPiece.y = 0;
  state.grid = placePiece(state.grid, state.currentPiece);

  return state;
};

export const lineBreak = state => {
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
  console.log(nbr_line);
  return state;
};
