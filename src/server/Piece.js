const listPieces = [
  [
    [".", "1", ".", "."],
    [".", "1", ".", "."],
    [".", "1", ".", "."],
    [".", "1", ".", "."]
  ],

  [
    [".", ".", ".", "."],
    [".", ".", ".", "."],
    ["1", "1", "1", "1"],
    [".", ".", ".", "."]
  ],
  [
    [".", ".", ".", "."],
    ["1", "1", "1", "1"],
    [".", ".", ".", "."],
    [".", ".", ".", "."]
  ],

  [
    [".", ".", "2", "."],
    [".", ".", "2", "."],
    [".", "2", "2", "."],
    [".", ".", ".", "."]
  ],
  [
    [".", "2", ".", "."],
    [".", "2", ".", "."],
    [".", "2", "2", "."],
    [".", ".", ".", "."]
  ]
];

//  mettre 4 pieces de chaque et centrer pareil pour le carre

class Piece {
  constructor() {
    this.grid = this.generateRandomPiece();
  }

  generateRandomPiece() {
    return listPieces[Math.floor(Math.random() * listPieces.length)];
  }
}

module.exports = Piece;
