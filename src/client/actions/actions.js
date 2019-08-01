import {
  CREATE_ROOM,
  JOIN_ROOM,
  START_GAME,
  NEXT_PIECE,
  LINE_BREAK,
  LIST_ROOM,
  ROOM_ADD_PLAYER,
  ROOM_DEL_PLAYER,
  SEND_SPECTRUM,
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE
} from "./actionTypes";
import EVENT from "../../common/common";

export const actionThunkUrl = (action, path) => {
  return dispatch => {
    dispatch(action);
    window.history.push(path);
  };
};

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

export const actionCreateRoom = (room, player) => {
  return {
    type: CREATE_ROOM,
    room: room,
    player: player,
    event: EVENT.CREATE_ROOM
  };
};

export const actionJoinRoom = (room, player) => {
  return {
    type: JOIN_ROOM,
    room: room,
    player: player,
    event: EVENT.JOIN_ROOM
  };
};

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
  return { type: SEND_SPECTRUM, event: EVENT.SEND_SPECTRUM };
};
