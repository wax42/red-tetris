// Utils

const cleanOldPiece = (grid, currentPiece) => {
    currentPiece.x;
    currentPiece.y;
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
}

const placePiece = (grid, currentPiece) => {
}



const rotatePiece = (grid) => {
} 



// SpacePiece
const downPiece = (grid, currentPiece) => {
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

