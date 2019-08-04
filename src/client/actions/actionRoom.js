import {
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE,
  NEXT_PIECE,
  SWITCH_PIECE,
  ADD_INDESTRUCTIBLES_LINES,
  SPECTRUMS,
  START_GAME,
  SPECTRUMS_SPECTATOR,
  CLEAR_LOSE
} from "./actionTypes";

export const actionPieceDown = () => {
  return { type: PIECE_DOWN };
};

export const actionPieceLeft = () => {
  return { type: PIECE_LEFT };
};

export const actionPieceRight = () => {
  return { type: PIECE_RIGHT };
};

export const actionPieceSpace = () => {
  return { type: PIECE_SPACE };
};

export const actionPieceRotate = () => {
  return { type: PIECE_ROTATE };
};

export const actionNextPiece = piece => {
  return { type: NEXT_PIECE, piece: piece };
};

export const actionSwitchPiece = () => {
  return { type: SWITCH_PIECE };
};

export const actionIndestructiblesLines = nbrLines => {
  return { type: ADD_INDESTRUCTIBLES_LINES, nbrLines: nbrLines };
};

export const actionSpectrum = spectrum => {
  return { type: SPECTRUMS, spectrum: spectrum };
};

export const actionSpectrumsSpectator = listSpectrums => {
  return { type: SPECTRUMS_SPECTATOR, listSpectrums: listSpectrums };
};

export const actionStartGame = (listPlayers, listPieces) => {
  return { type: START_GAME, listPlayers: listPlayers, listPieces: listPieces };
};

export const actionSendClearLose = (clearInterval, eventListner) => {
  return {
    type: CLEAR_LOSE,
    clearInterval: clearInterval,
    eventListner: eventListner
  };
};
