import {
  CREATE_ROOM,
  JOIN_ROOM,
  LIST_ROOM_PLAYER,
  IS_NEW_ADMIN,
  IS_SPECTATOR,
  CLEAN_ROOM_NAME,
  ERROR_REDUX
} from "./actionsTypes";
import eventSocket from "../../common/eventSocket";

// action for redux state

export const actionError = error => {
  return {
    type: ERROR_REDUX,
    error: error
  };
};

export const actionIsSpectator = () => {
  return {
    type: IS_SPECTATOR
  };
};

export const actionIsNewAdmin = (admin) => {
  return {
    type: IS_NEW_ADMIN,
    admin: admin
  };
};

export const actionListRoomPlayer = (listRooms, listPlayers) => {
  return {
    type: LIST_ROOM_PLAYER,
    listRooms: listRooms,
    listPlayers: listPlayers
  };
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

export const actionCleanRoomName = () => {
  return {
    type: CLEAN_ROOM_NAME
  };
};