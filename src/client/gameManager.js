import { placePiece } from "./gridChange";
import _ from "lodash";

import { GRID } from "../common/common";

import eventSocket from "../common/eventSocket";

import {
  actionPieceDown,
  actionPieceLeft,
  actionPieceRight,
  actionPieceRotate,
  actionPieceSpace,
  actionSwitchPiece,
  actionSendClearLose
} from "./actions/actionRoom";

const KEY_SPACE = 32;
const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_S = 83;

export const handleKey = (state, dispatchRoom) => event => {
  console.log(
    "KEY EVENT",
    event.keyCode,
    state.grid,
    state.shadow,
    state.currentPiece
  );
  switch (event.keyCode) {
    case KEY_DOWN:
      event.preventDefault();
      dispatchRoom(actionPieceDown());
      // setState(downPiece(newState, socket));
      break;
    case KEY_LEFT:
      event.preventDefault();
      dispatchRoom(actionPieceLeft());
      // setState(leftPiece(newState));
      break;
    case KEY_RIGHT:
      event.preventDefault();
      dispatchRoom(actionPieceRight());
      // setState(rightPiece(newState));
      break;
    case KEY_SPACE:
      event.preventDefault();
      dispatchRoom(actionPieceSpace());
      // setState(downFloorPiece(newState, socket));
      console.log("KEY BHOOOK", JSON.stringify(state.grid));
      break;
    case KEY_UP:
      event.preventDefault();
      dispatchRoom(actionPieceRotate());

      // setState(rotatePiece(newState));
      break;
    case KEY_S:
      console.log("ici");
      event.preventDefault();
      dispatchRoom(actionSwitchPiece());
      break;
    default:
      break;
  }
};

export const launchGame = (state, dispatchRoom) => {
  const eventListner = handleKey(state, dispatchRoom);

  window.addEventListener("keydown", eventListner, false);
  console.log("Je launch la game");
  let clearInterval = setInterval(() => {
    dispatchRoom(actionPieceDown());
    console.log("dsipatch Piece down set interval");
    // setState(downPiece({ ...state }));
  }, 1000);
  dispatchRoom(actionSendClearLose(clearInterval, eventListner));
  console.log("Je launch la game end");
  dispatchRoom(actionPieceDown());
  // setState(downPiece({ ...state }));
};

export const cleanListennerLose = (clInterval, eventListner) => {
  console.log("cleanListennerLose", clInterval, eventListner);
  window.removeEventListener("keydown", eventListner, false);
  clearInterval(clInterval);
};

const initializeListSpectrums = (state, listPlayers) => {
  for (let player of listPlayers) {
    state.listSpectrums[player] = {
      grid: [
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
      ],
      score: 0,
      playerName: player
    };
  }
  return state;
};

export const startGame = (state, listPlayers, listPieces) => {
  state = initializeListSpectrums(state, listPlayers);
  state.currentPiece.piece = listPieces.shift();
  state.listPieces = listPieces;
  state.grid = _.cloneDeep(GRID);
  console.log("START GAME", JSON.stringify(GRID));
  return state;
};

export const nextPiece = state => {
  // if (state.listPieces.length < 4) {
  state.currentPiece.x = 5;

  state.socket.emit(eventSocket.NEXT_PIECE, state.grid);
  // }

  state.currentPiece.piece = state.listPieces.shift();
  state.currentPiece.x = 5;
  state.currentPiece.y = 0;

  state.grid = placePiece(state.grid, state.currentPiece);

  return state;
};

export const lineBreak = state => {
  console.log("Line break");
  let nbrLine = 0;
  state.grid = state.grid.filter(line => {
    if (_.difference(line, ["0", ".", "8"]).length === 10) {
      nbrLine++;
      return false;
    } else {
      return true;
    }
  });
  if (nbrLine !== 0) {
    state.socket.emit(eventSocket.LINE_BREAK, nbrLine);
    while (nbrLine !== 0) {
      state.grid.unshift(new Array(10).fill("."));
      nbrLine--;
    }
  }

  console.log(state);

  return state;
};
