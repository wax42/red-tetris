import { nextPiece } from "../actions/actions";
import _ from "lodash";
// Utils

const rotate = matrix => {
  let result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = matrix.map(e => e[i]).reverse();
    result.push(row);
  }
  return result;
};

const cleanOldPiece = (grid, currentPiece) => {
  let y_piece = 0;
  for (let y = currentPiece.y; y < currentPiece.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = currentPiece.x; x < currentPiece.x + 4 && x < 10; x++) {
      if (
        currentPiece.piece[y_piece][x_piece] != "." &&
        currentPiece.piece[y_piece][x_piece] == grid[y][x]
      ) {
        grid[y][x] = ".";
      }

      x_piece++;
    }
    y_piece++;
  }
  return grid;
};

const placePiece = (grid, currentPiece) => {
  // TODO test
  let y_piece = 0;
  for (let y = currentPiece.y; y < currentPiece.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = currentPiece.x; x < currentPiece.x + 4 && x < 10; x++) {
      // Gerer l'ombre)
      if (
        currentPiece.piece[y_piece][x_piece] != "." &&
        (grid[y][x] == "." || grid[y][x] == "0")
      ) {
        grid[y][x] = currentPiece.piece[y_piece][x_piece];
      }
      x_piece++;
    }
    y_piece++;
  }
  return grid;
};

const calculateSpaceUp = currentPiece => {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (currentPiece.piece[y][x] != ".") {
        return y;
      }
    }
  }
};

const calculateSpaceDown = currentPiece => {
  for (let y = 3; y >= 0; y--) {
    for (let x = 0; x < 4; x++) {
      if (currentPiece.piece[y][x] != ".") {
        return 3 - y;
      }
    }
  }
};

const calculateSpaceLeft = currentPiece => {
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (currentPiece.piece[y][x] != ".") {
        return x;
      }
    }
  }
};

const calculateSpaceRight = currentPiece => {
  for (let x = 3; x >= 0; x--) {
    for (let y = 0; y < 4; y++) {
      if (currentPiece.piece[y][x] != ".") {
        return 3 - x;
      }
    }
  }
};

const checkIsPos = (grid, currentPiece) => {
  let y_piece = 0;
  //console.log("Space down", calculateSpaceDown(currentPiece));
  // console.log("Space left", calculateSpaceLeft(currentPiece));
  // console.log("Space right", calculateSpaceRight(currentPiece));
  // console.log("Space up", calculateSpaceUp(currentPiece));

  if (
    currentPiece.y > 24 - 4 + calculateSpaceDown(currentPiece) ||
    currentPiece.y < 0 - 4 + calculateSpaceUp(currentPiece) ||
    currentPiece.x < 0 - 4 + calculateSpaceLeft(currentPiece) ||
    currentPiece.x > 10 - 4 + calculateSpaceRight(currentPiece)
  ) {
    return false;
  }

  for (let y = currentPiece.y; y < currentPiece.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = currentPiece.x; x < currentPiece.x + 4 && x < 10; x++) {
      //console.log("x y x_piece y_piece", x, y, x_piece, y_piece);
      if (
        currentPiece.piece[y_piece][x_piece] !== "." &&
        (grid[y][x] != "." && grid[y][x] !== "0")
      ) {
        // console.log("x y x_piece y_piece", x, y, x_piece, y_piece);
        return false;
      }
      x_piece++;
    }
    y_piece++;
  }
  return true;
};

const placeShadow = (grid, shadow) => {
  let y_piece = 0;
  for (let y = shadow.y; y < shadow.y + 4 && y < 24; y++) {
    let x_piece = 0;
    for (let x = shadow.x; x < shadow.x + 4 && x < 10; x++) {
      if (grid[y][x] == ".") {
        grid[y][x] = shadow.piece[y_piece][x_piece];
      }
      x_piece++;
    }
    y_piece++;
  }
  return grid;
};

const positionShadow = state => {
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

export const downFloorPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  state = positionShadow(state);
  state.currentPiece.x = state.shadow.x;
  state.currentPiece.y = state.shadow.y;
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const rotatePiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);

  state.currentPiece.piece = rotate(state.currentPiece.piece);
  if (checkIsPos(state.grid, state.currentPiece) == false) {
    return null;
  }
  state = positionShadow(state);

  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

// SpacePiece
export const downPiece = state => {
  console.log("grid", JSON.stringify(state.grid));

  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  console.log("downPiece after cleanOldPiece ", state.grid);

  state.currentPiece.y += 1;
  if (checkIsPos(state.grid, state.currentPiece) == false) {
    state.currentPiece.y -= 1;
    state.grid = placePiece(state.grid, state.currentPiece);
    console.log("Piece is not posable");
    return state;
  }
  state = positionShadow(state);
  console.log("downPiece after positionShadow ", state.grid);

  state.grid = placePiece(state.grid, state.currentPiece);
  console.log("downPiece after placePiece ", state.grid);

  return state;
};

export const leftPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  state.currentPiece.x -= 1;
  if (checkIsPos(state.grid, state.currentPiece) == false) {
    state.currentPiece.x += 1;
    state.grid = placePiece(state.grid, state.currentPiece);
    console.log("Piece is not posable");
    return state;
  }
  state = positionShadow(state);

  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const rightPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  state.currentPiece.x += 1;
  if (checkIsPos(state.grid, state.currentPiece) == false) {
    state.currentPiece.x -= 1;
    state.grid = placePiece(state.grid, state.currentPiece);
    console.log("Piece is not posable");
    return state;
  }
  state = positionShadow(state);

  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};
