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
  actionSendIntervalKeyEvent
} from "./actions/actionRoom";

const KEY_SPACE = 32;
const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_S = 83;

export const handleKey = dispatchRoom => event => {
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

export const launchGame = dispatchRoom => {
  // console.log("LAUNCH GAME set interval value ");

  const eventListner = handleKey(dispatchRoom);
  window.addEventListener("keydown", eventListner, false);
  let clearInterval = setInterval(() => {
    dispatchRoom(actionPieceDown());
    // console.log("dsipatch Piece down set interval");
  }, 1000);
  dispatchRoom(actionSendIntervalKeyEvent(clearInterval, eventListner));
  // dispatchRoom(actionPieceDown());
};

export const cleanListennerEndGame = state => {
  console.log("JE CLEAN LISTENNER  BECAUSE END OF GAME");
  window.removeEventListener("keydown", state.eventListner, false);
  clearInterval(state.clearInterval);
  state.clearInterval = -1;
  console.log(state);
  return state;
};

export const initializeListSpectrums = (state, listPlayers) => {
  state.listSpectrums = {};
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

  state.lose = false;
  state.currentPiece.piece = listPieces.shift();
  state.currentPiece.x = 3;
  state.currentPiece.y = 0;
  state.listPieces = listPieces;
  state.grid = _.cloneDeep(GRID);
  // console.log("START GAME", JSON.stringify(GRID));
  return state;
};

export const nextPiece = state => {
  // if (state.listPieces.length < 4) {
  // state.currentPiece.x = 4;

  state.socket.emit(eventSocket.NEXT_PIECE, state.grid);
  // }

  state.currentPiece.piece = state.listPieces.shift();
  state.currentPiece.x = 3;
  state.currentPiece.y = 0;

  state.grid = placePiece(state.grid, state.currentPiece);

  return state;
};

export const lineBreak = state => {
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
  return state;
};
