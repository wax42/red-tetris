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

/* ACTION WITH EVENT */

export const actionStartGame = () => {
  return { type: START_GAME, event: EVENT.START_GAME };
};

export const actionNextPiece = () => {
  return { type: NEXT_PIECE, event: EVENT.NEXT_PIECE };
};

export const actionLineBreak = () => {
  return { type: LINE_BREAK, event: EVENT.LINE_BREAK };
};

export const actionListRoom = () => {
  return { type: LIST_ROOM, event: EVENT.LIST_ROOM };
};

export const actionRoomAddPlayer = () => {
  return { type: ROOM_ADD_PLAYER, event: EVENT.ROOM_ADD_PLAYER };
};

export const actionRoomDelPlayer = () => {
  return { type: ROOM_DEL_PLAYER, event: EVENT.ROOM_DEL_PLAYER };
};

export const actionSpectrums = () => {
  return { type: SEND_SPECTRUMS, event: EVENT.SEND_SPECTRUMS };
};
