import {
  START_GAME,
  NEXT_PIECE,
  LINE_BREAK,
  LIST_ROOM,
  ROOM_ADD_PLAYER,
  ROOM_DEL_PLAYER,
  SEND_SPECTRUMS,
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE

} from "./actionTypes";
import { EVENT } from "../../common/common";

/* ACTION  WITHOUT SERVER */

export const pieceDown = () => {
  return { type: PIECE_DOWN }
}

export const PieceLeft = () => {
  return { type: PIECE_LEFT }
}

export const PieceRight = () => {
  return { type: PIECE_RIGHT }
}

export const PieceSpace = () => {
  return { type: PIECE_SPACE }
}

export const PieceRotate = () => {
  return { type: PIECE_ROTATE }
}

/* ACTION WITH EVENT */

export const startGame = () => {
  return { type: START_GAME, event: EVENT.START_GAME };
};

export const nextPiece = () => {
  return { type: NEXT_PIECE, event: EVENT.NEXT_PIECE };
};

export const lineBreak = () => {
  return { type: LINE_BREAK, event: EVENT.LINE_BREAK };
};

export const listRoom = () => {
  return { type: LIST_ROOM, event: EVENT.LIST_ROOM };
};

export const roomAddPlayer = () => {
  return { type: ROOM_ADD_PLAYER, event: EVENT.ROOM_ADD_PLAYER };
};

export const roomDelPlayer = () => {
  return { type: ROOM_DEL_PLAYER, event: EVENT.ROOM_DEL_PLAYER };
};

export const sendSpectrums = () => {
  return { type: SEND_SPECTRUMS, event: EVENT.SEND_SPECTRUMS };
};

//TODO DELETE
export function actionClick() {
  console.log("actionClick");
  return { type: "RER", name: "yoyo", text: "Cliiick" };
}
