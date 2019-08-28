import {
  nextPiece,
  lineBreak,
  cleanListennerEndGame
}
from "./gameManager";
import _ from "lodash";
import eventSocket from "../../../common/eventSocket";

export const rotate = matrix => {
  let result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = matrix.map(e => e[i]).reverse();
    result.push(row);
  }
  return result;
};

export const cleanOldPiece = (grid, currentPiece) => {
  let y_piece = 0;
  for (let y = currentPiece.y; y < currentPiece.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = currentPiece.x; x < currentPiece.x + 4 && x < 10; x++) {
      if (
        currentPiece.piece[y_piece][x_piece] !== "." &&
        currentPiece.piece[y_piece][x_piece] === grid[y][x]
      ) {
        grid[y][x] = ".";
      }

      x_piece++;
    }
    y_piece++;
  }
  return grid;
};

export const placePiece = (grid, currentPiece) => {
  let y_piece = 0;
  for (let y = currentPiece.y; y < currentPiece.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = currentPiece.x; x < currentPiece.x + 4 && x < 10; x++) {
      if (
        currentPiece.piece[y_piece][x_piece] !== "." &&
        (grid[y][x] === "." || grid[y][x] === "0")
      ) {
        grid[y][x] = currentPiece.piece[y_piece][x_piece];
      }
      x_piece++;
    }
    y_piece++;
  }
  return grid;
};

export const calculateSpaceUp = currentPiece => {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (currentPiece.piece[y][x] !== ".") {
        return y;
      }
    }
  }
};

export const calculateSpaceDown = currentPiece => {
  for (let y = 3; y >= 0; y--) {
    for (let x = 0; x < 4; x++) {
      if (currentPiece.piece[y][x] !== ".") {
        return 3 - y;
      }
    }
  }
};

export const calculateSpaceLeft = currentPiece => {
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (currentPiece.piece[y][x] !== ".") {
        return x;
      }
    }
  }
};

export const calculateSpaceRight = currentPiece => {
  for (let x = 3; x >= 0; x--) {
    for (let y = 0; y < 4; y++) {
      if (currentPiece.piece[y][x] !== ".") {
        return 3 - x;
      }
    }
  }
};

export const checkIsPos = (grid, currentPiece) => {
  let y_piece = 0;

  if (
    currentPiece.y > 24 - 4 + calculateSpaceDown(currentPiece) ||
    currentPiece.x > 10 - 4 + calculateSpaceRight(currentPiece) ||
    currentPiece.x < 0 - calculateSpaceLeft(currentPiece) ||
    currentPiece.y < 0 - calculateSpaceUp(currentPiece)
  ) {
    return false;
  }

  for (let y = currentPiece.y; y < currentPiece.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = currentPiece.x; x < currentPiece.x + 4 && x < 10; x++) {
      if (
        currentPiece.piece[y_piece][x_piece] !== "." &&
        (grid[y][x] !== "." && grid[y][x] !== "0")
      ) {
        return false;
      }
      x_piece++;
    }
    y_piece++;
  }

  return true;
};

export const placeShadow = (grid, shadow) => {
  let y_piece = 0;
  for (let y = shadow.y; y < shadow.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = shadow.x; x < shadow.x + 4 && x < 10; x++) {
      if (grid[y][x] === ".") {
        grid[y][x] = shadow.piece[y_piece][x_piece];
      }
      x_piece++;
    }
    y_piece++;
  }
  return grid;
};

export const positionShadow = state => {
  state.grid = cleanOldPiece(state.grid, state.shadow);

  state.shadow.x = state.currentPiece.x;
  state.shadow.y = state.currentPiece.y;
  state.shadow.piece = state.currentPiece.piece.map(line => {
    return line.map(el => {
      if (el !== ".") return "0";
      else return ".";
    });
  });

  state.shadow.y++;
  while (checkIsPos(state.grid, state.shadow) === true) {
    state.shadow.y++;
  }
  state.shadow.y--;
  state.grid = placeShadow(state.grid, state.shadow);
  return state;
};

export const checkIslose = state => {
  for (let i = 0; i < 4; i++) {
    if (_.difference(state.grid[i], ["."]).length !== 0) {
      return true;
    }
  }
  return false;
};

export const downFloorPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  state = positionShadow(state);
  state.currentPiece.x = state.shadow.x;
  state.currentPiece.y = state.shadow.y;
  state.grid = placePiece(state.grid, state.currentPiece);

  if (checkIslose(state) === true) {
    cleanListennerEndGame(state.eventListner, state.clearInterval, state.clearTimeout);
    state.endOfGame = true;
    state.clearInterval = -1;
    state.lose = true;
    state.socket.emit(eventSocket.LOSE);
    nextPiece(state);
    return state;
  }
  lineBreak(state);
  nextPiece(state);
  return state;
};

export const rotatePiece = state => {
  let tmp = {
    ...state.currentPiece
  };
  state.grid = cleanOldPiece(state.grid, state.currentPiece);

  tmp.piece = rotate(tmp.piece);
  if (checkIsPos(state.grid, tmp) === false) {
    return null;
  }
  state.currentPiece = tmp;
  state = positionShadow(state);
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const downPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);

  state.currentPiece.y += 1;
  if (checkIsPos(state.grid, state.currentPiece) === false) {
    state.currentPiece.y -= 1;
    state.grid = placePiece(state.grid, state.currentPiece);

    if (checkIslose(state) === true) {
      state.lose = true;
      cleanListennerEndGame(state.eventListner, state.clearInterval, state.clearTimeout);
      state.endOfGame = true;
      state.clearInterval = -1;
      state.socket.emit(eventSocket.LOSE);
      nextPiece(state);
      return state;
    }
    state = lineBreak(state);
    state = nextPiece(state);
    return state;
  }
  state = positionShadow(state);
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const leftPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  state.currentPiece.x -= 1;
  if (checkIsPos(state.grid, state.currentPiece) === false) {
    state.currentPiece.x += 1;
    state.grid = placePiece(state.grid, state.currentPiece);
    return state;
  }
  state = positionShadow(state);
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const rightPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  state.currentPiece.x += 1;
  if (checkIsPos(state.grid, state.currentPiece) === false) {
    state.currentPiece.x -= 1;
    state.grid = placePiece(state.grid, state.currentPiece);
    return state;
  }
  state = positionShadow(state);
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const switchPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  let tmp = {
    ...state.currentPiece
  };
  tmp.piece = state.listPieces[0];
  if (checkIsPos(state.grid, tmp) === false) {
    state.grid = placePiece(state.grid, state.currentPiece);
    return state;
  }
  state.listPieces[0] = state.currentPiece.piece;
  state.currentPiece = tmp;
  state = positionShadow(state);
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const addIndestructiblesLines = (state, nbrLine) => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  while (nbrLine !== 0) {
    state.grid.push(new Array(10).fill("8"));
    state.grid.shift();
    nbrLine--;
  }
  if (checkIsPos(state.grid, state.currentPiece) === false) {
    while (checkIsPos(state.grid, state.currentPiece) === false) {
      state.currentPiece.y -= 1;
    }
  } else {
    state.currentPiece.y -= 1;
  }
  state = downPiece({
    ...state
  });
  return state;
};