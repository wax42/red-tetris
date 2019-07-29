import { nextPiece } from "../actions/actions";

// Utils

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
      // Gerer l'ombre
      if (grid[y][x] == "." || grid[y][x] == "0") {
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
  console.log("Space down", calculateSpaceDown(currentPiece));
  console.log("Space left", calculateSpaceLeft(currentPiece));
  console.log("Space right", calculateSpaceRight(currentPiece));
  console.log("Space up", calculateSpaceUp(currentPiece));

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
      console.log("x y x_piece y_piece", x, y, x_piece, y_piece);
      if (
        currentPiece.piece[y_piece][x_piece] != "." &&
        (grid[y][x] != "." || y > 24 || x < 0 || x > 10)
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

// const pieceIsPlace = (grid, currentPiece) => {
//   let y_piece = 0;
//   for (let y = currentPiece.y; y < currentPiece.y + 4 && y < 24; y++) {
//     let x_piece = 0;
//     for (let x = currentPiece.x; x < currentPiece.x + 4 && x < 10; x++) {
//       if (
//         currentPiece.piece[y_piece][x_piece] != "." &&
//         ((y_piece + 1 < 4 && // check overflow
//         grid[y + 1][x] != "." && // check en dessous si y autre chose qu'un .
//           currentPiece.piece[y_piece + 1][x_piece] == ".") || // check si la case appartient a notre piece
//           y == 23)
//       ) {
//         // currentPiece.piece[y_piece][x_piece] != "."
//         return true;
//       }
//       x_piece++;
//     }
//     y_piece++;
//   }
//   return false;
// };

const rotatePiece = (grid, currentPiece) => {
  let piece = currentPiece.piece;
  // Askip ça marche
  // _zip(...currentPiece.piece); // Il faut importe lodash
  // unzip(currentPiece.piece);
  // Ou ça
  piece[0].map((col, i) => piece.map(row => row[i]));
};

// SpacePiece
export const downPiece = state => {
  console.log("grid", JSON.stringify(state.grid));

  state.grid = cleanOldPiece(state.grid, state.currentPiece);

  state.currentPiece.y += 1;
  if (checkIsPos(state.grid, state.currentPiece) == false) {
    state.currentPiece.y -= 1;
    state.grid = placePiece(state.grid, state.currentPiece);
    console.log("Piece is not posable");
    // nextPiece();
    return state;
  }

  state.grid = placePiece(state.grid, state.currentPiece);

  return state;
};

export const leftPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  let n = 0;
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      if (state.currentPiece.piece[y][x] != ".") {
        n = x;
        break;
      }
    }
  }
  console.log(n, state.currentPiece.x);
  if (state.currentPiece.x + n > 0) {
    state.currentPiece.x -= 1;
  }
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};

export const rightPiece = state => {
  state.grid = cleanOldPiece(state.grid, state.currentPiece);
  let n = 0;
  for (let x = 3; x >= 0; x--) {
    for (let y = 0; y < 4; y++) {
      if (state.currentPiece.piece[y][x] != ".") {
        n = 3 - x;
        break;
      }
    }
  }
  console.log("n", n);
  if (state.currentPiece.x + n < 10) {
    state.currentPiece.x += 1;
  }
  state.grid = placePiece(state.grid, state.currentPiece);
  return state;
};
