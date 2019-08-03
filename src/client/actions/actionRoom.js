import {
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE,
  NEXT_PIECE
} from "./actionTypes";

export const actionPieceDown = socket => {
  return { type: PIECE_DOWN, socket: socket };
};

export const actionPieceLeft = () => {
  return { type: PIECE_LEFT };
};

export const actionPieceRight = () => {
  return { type: PIECE_RIGHT };
};

export const actionPieceSpace = socket => {
  return { type: PIECE_SPACE, socket: socket };
};

export const actionPieceRotate = () => {
  return { type: PIECE_ROTATE };
};

export const actionNextPiece = piece => {
  return { type: NEXT_PIECE, piece: piece };
};
