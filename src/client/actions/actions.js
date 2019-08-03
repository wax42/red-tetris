import {
  CREATE_ROOM,
  JOIN_ROOM,
  START_GAME,
  LINE_BREAK,
  LIST_ROOM_PLAYER,
  ROOM_ADD_PLAYER,
  ROOM_DEL_PLAYER,
  SEND_SPECTRUM,
  IS_NEW_ADMIN
} from "./actionTypes";
import eventSocket from "../../common/common";

/* ACTION  WITHOUT SERVER */

export const actionIsNewAdmin = () => {
  return { type: IS_NEW_ADMIN };
};

/* ACTION WITH eventSocket */

export const actionListRoomPlayer = () => {
  return { type: LIST_ROOM_PLAYER, eventSocket: eventSocket.LIST_ROOM_PLAYER };
};

export const actionCreateRoom = (room, player) => {
  return {
    type: CREATE_ROOM,
    room: room,
    player: player,
    eventSocket: eventSocket.CREATE_ROOM
  };
};

export const actionJoinRoom = (room, player) => {
  return {
    type: JOIN_ROOM,
    room: room,
    player: player,
    eventSocket: eventSocket.JOIN_ROOM
  };
};

export const actionStartGame = () => {
  return { type: START_GAME, eventSocket: eventSocket.START_GAME };
};

export const actionLineBreak = () => {
  return { type: LINE_BREAK, eventSocket: eventSocket.LINE_BREAK };
};

export const actionRoomAddPlayer = () => {
  return { type: ROOM_ADD_PLAYER, eventSocket: eventSocket.ROOM_ADD_PLAYER };
};

export const actionRoomDelPlayer = () => {
  return { type: ROOM_DEL_PLAYER, eventSocket: eventSocket.ROOM_DEL_PLAYER };
};

export const actionSpectrums = () => {
  return { type: SEND_SPECTRUM, eventSocket: eventSocket.SEND_SPECTRUM };
};
