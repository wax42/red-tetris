import {
  placePiece
} from "./gridChange";
import _ from "lodash";

import {
  GRID
} from "../common/common";

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
      break;
    case KEY_LEFT:
      event.preventDefault();
      dispatchRoom(actionPieceLeft());
      break;
    case KEY_RIGHT:
      event.preventDefault();
      dispatchRoom(actionPieceRight());
      break;
    case KEY_SPACE:
      event.preventDefault();
      dispatchRoom(actionPieceSpace());
      break;
    case KEY_UP:
      event.preventDefault();
      dispatchRoom(actionPieceRotate());
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

export const launchGame = (dispatchRoom, gameInterval) => {
  console.error("Launch game", gameInterval);
  setTimeout(() => {
    const eventListner = handleKey(dispatchRoom);
    window.addEventListener("keydown", eventListner, false);
    let clearInterval = setInterval(() => {
      dispatchRoom(actionPieceDown());
    }, gameInterval);
    dispatchRoom(actionSendIntervalKeyEvent(clearInterval, eventListner));
    console.log("counter END");
  }, 4000);
};

export const cleanListennerEndGame = (eventListner, cleanInterval) => {
  window.removeEventListener("keydown", eventListner, false);
  clearInterval(cleanInterval);
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

export const startGame = (state, listPlayers, listPieces, optionGames) => {
  state = initializeListSpectrums(state, listPlayers);

  state.shakeMode = optionGames.shakeMode;

  state.lose = false;
  state.currentPiece.piece = listPieces.shift();
  state.currentPiece.x = 3;
  state.currentPiece.y = 0;
  state.listPieces = listPieces;
  state.grid = _.cloneDeep(GRID);
  state.counterAnimation = true;
  return state;
};

export const nextPiece = state => {
  console.log("JE VAIS EMIT POUR NEXT PIECE");
  state.socket.emit(eventSocket.NEXT_PIECE, state.grid);

  state.currentPiece.piece = state.listPieces.shift();
  state.currentPiece.x = 3;
  state.currentPiece.y = 0;

  state.grid = placePiece(state.grid, state.currentPiece);

  return state;
};

export const lineBreak = state => {
  state.brokenLines = [];
  let nbrLine = 0;
  state.grid = state.grid.filter((line, index) => {
    if (_.difference(line, ["0", ".", "8"]).length === 10) {
      console.log("LINEBREAK++");
      state.brokenLines.push(index);
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