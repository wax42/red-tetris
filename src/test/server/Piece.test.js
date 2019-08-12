import { Piece, listPieces } from "../../server/Piece";

describe("SERVER/PIECE.JS", () => {
  it("should generate a random piece", () => {
    const piece = new Piece();
    const randomPiece = piece.generateRandomPiece();
    expect(listPieces).toContain(randomPiece);
  });
});
