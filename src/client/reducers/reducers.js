// import io from "socket.io-client";

import {
  CREATE_ROOM,
  JOIN_ROOM,
  LIST_ROOM_PLAYER,
  IS_NEW_ADMIN,
  IS_SPECTATOR,
  CLEAN_ROOM_NAME
} from "../actions/actionTypes";

const io = require("socket.io-client")("http://localhost:3001", {
  transports: ["websocket", "polling"]
});

const initialState = {
  socket: null,
  admin: false,
  spectator: false,
  listRooms: [],
  listPlayers: [],
  timeId: null
};

const reducers = (state = initialState, action) => {
  state.nextPieceEvent = false;

  if (state.socket === null) {
    state.socket = io;
    // state.socket = io("http://localhost:3001");

    // console.error("SOCKET INITILIALIZATIOn");
  }
  if (action.eventSocket !== undefined) {
    return state;
  }
  // console.error("START REDUCER", action);

  // let newState = Object.assign({}, state)

  switch (action.type) {
    case IS_SPECTATOR:
      return {
        ...state,
        spectator: !state.spectator
      };
    case LIST_ROOM_PLAYER:
      console.log("REDUCER", action.listRooms, action.listPlayers);
      return {
        ...state,
        listRooms: action.listRooms,
        listPlayers: action.listPlayers
      };
    case CREATE_ROOM:
      return {
        ...state,
        roomName: action.room,
        playerName: action.player,
        admin: true
      };
    case JOIN_ROOM:
      return { ...state, roomName: action.room, playerName: action.player };
    case IS_NEW_ADMIN:
      return { ...state, admin: true };
    case CLEAN_ROOM_NAME:
      return { ...state, roomName: undefined };
    default:
      return state;
  }
  return state;
};

export default reducers;
