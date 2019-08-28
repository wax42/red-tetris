import { Piece, listPieces } from "../../server/Piece";

describe("SERVER/PIECE.JS", () => {
  it("should generate a random piece - invisbility false", () => {
    const piece = new Piece(false);
    const randomPiece = piece.generateRandomPiece(false);
    expect(listPieces).toContainEqual(randomPiece);
  });

  it("should generate a random piece - invisbility true", () => {
    const piece = new Piece(true);
    let randomPiece = [
      [".", "10", ".", "."],
      [".", "10", ".", "."],
      [".", "10", ".", "."],
      [".", "10", ".", "."]
    ];
    randomPiece = randomPiece.map(line => {
      return line.map(el => {
        if (el !== ".") return "1";
        else return el;
      });
    });
    expect(listPieces).toContainEqual(randomPiece);
  });
});
