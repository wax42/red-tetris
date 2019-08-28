import {
  GAME_FINISH,
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
  SEND_INTERVAL_KEY_EVENT,
  WINNER_IS,
  CLEAR_INTERVAL_KEY_EVENT
} from "./actionsTypes";


export const actionGameFinish = () => {
  return {
    type: GAME_FINISH
  };
};


export const actionPieceDown = () => {
  return {
    type: PIECE_DOWN
  };
};

export const actionPieceLeft = () => {
  return {
    type: PIECE_LEFT
  };
};

export const actionPieceRight = () => {
  return {
    type: PIECE_RIGHT
  };
};

export const actionPieceSpace = () => {
  return {
    type: PIECE_SPACE
  };
};

export const actionPieceRotate = () => {
  return {
    type: PIECE_ROTATE
  };
};

export const actionNextPiece = piece => {
  return {
    type: NEXT_PIECE,
    piece: piece
  };
};

export const actionSwitchPiece = () => {
  return {
    type: SWITCH_PIECE
  };
};

export const actionIndestructiblesLines = nbrLines => {
  return {
    type: ADD_INDESTRUCTIBLES_LINES,
    nbrLines: nbrLines
  };
};

export const actionSpectrum = spectrum => {
  return {
    type: SPECTRUMS,
    spectrum: spectrum
  };
};

export const actionSpectrumsSpectator = listSpectrums => {
  return {
    type: SPECTRUMS_SPECTATOR,
    listSpectrums: listSpectrums
  };
};

export const actionStartGame = (listPlayers, listPieces, optionGames, clearTimeout) => {
  return {
    type: START_GAME,
    listPlayers: listPlayers,
    listPieces: listPieces,
    optionGames: optionGames,
    clearTimeout: clearTimeout
  };
};

export const actionSendIntervalKeyEvent = (clearInterval, eventListner) => {
  return {
    type: SEND_INTERVAL_KEY_EVENT,
    clearInterval: clearInterval,
    eventListner: eventListner
  };
};

export const actionClearIntervalKeyEvent = () => {
  return {
    type: CLEAR_INTERVAL_KEY_EVENT
  };
};

export const actionWinnerIs = winner => {
  return {
    type: WINNER_IS,
    winner: winner
  };
};