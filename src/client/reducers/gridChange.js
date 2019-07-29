import { nextPiece } from "../actions/actions";

// Utils

const cleanOldPiece = (grid, currentPiece) => {
    let x_piece = 0;
    let y_piece = 0;

    for (y=currentPiece.y; y < currentPiece.y + 4 && y <= 24; y++) {
        for (x=currentPiece.x; x < currentPiece.x + 4 && x <= 10; x++) {
            if (currentPiece.piece[y_piece][x_piece] == grid[y][x]) {
                grid[y][x] = '.';
            }
            x_piece++;
        }
        y_piece++;

    }
    return grid;
}

const placePiece = (grid, currentPiece) => {
    let x_piece = 0;
    let y_piece = 0;

    // TODO test

    for (y=currentPiece.y; y < currentPiece.y + 4 && y <= 24; y++) {
        for (x=currentPiece.x; x < currentPiece.x + 4 && x <= 10; x++) {


            // Gerer l'ombre
            if (grid[y][x] == '.' || grid[y][x] == '0') {
                grid[y][x] = currentPiece.piece[y_piece][x_piece];
            }
            x_piece++;
        }
        y_piece++;

    }
    return grid;
}

const pieceIsPlace = () => {
    let x_piece = 0;
    let y_piece = 0;

    for (y=currentPiece.y; y < currentPiece.y + 4 && y <= 24; y++) {
        for (x=currentPiece.x; x < currentPiece.x + 4 && x <= 10; x++) {
            
            if (grid[y + 1][x] != '.' && currentPiece.piece[y_piece][x_piece] != '.') {
                return true;
            }
            x_piece++;
        }
        y_piece++;

    }
    return false;
}

const rotatePiece = (grid, currentPiece) => {

    let piece =  currentPiece.piece
    // Askip ça marche
    // _zip(...currentPiece.piece); // Il faut importe lodash
    // Ou ça   
    piece[0].map((col, i) => piece.map(row => row[i]));

} 



// SpacePiece
const downPiece = (grid, currentPiece) => {

   if (pieceIsPlace(grid, currentPiece) == true) {
        nextPiece();
        return { grid, currentPiece};
   }    
   grid = cleanOldPiece(grid, currentPiece)
   currentPiece.y += 1;
   grid = placePiece(grid, currentPiece);

   return { grid , currentPiece};
}


const leftPiece = (grid) => {
    grid = cleanOldPiece(grid, currentPiece)
    currentPiece.x -= 1; // Checker 0
    grid = placePiece(grid, currentPiece);
    return { grid , currentPiece};
}

const rightPiece = (grid) => {
    grid = cleanOldPiece(grid, currentPiece)
    currentPiece.x += 1;
    grid = placePiece(grid, currentPiece);
    return { grid , currentPiece};
}

