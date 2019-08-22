// import io from "socket.io-client";

import {
  CREATE_ROOM,
  JOIN_ROOM,
  LIST_ROOM_PLAYER,
  IS_NEW_ADMIN,
  IS_SPECTATOR,
  CLEAN_ROOM_NAME,
  ERROR
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
  timeId: null,
  error: null
};

const reducers = (state = initialState, action) => {

  console.log("reducers redux", action)
  if (state.socket === null) {
    console.log("Connection lost")
    state.socket = io;
    console.log(io)

  }
  if (action.eventSocket !== undefined) {
    return state;
  }
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        error: action.error,
          roomName: undefined,
          admin: false,
          spectator: false,
          listPlayers: [],
          listRooms: []
      };
    case IS_SPECTATOR:
      return {
        ...state,
        error: null,
          spectator: !state.spectator
      };
    case LIST_ROOM_PLAYER:
      return {
        ...state,
        error: null,
          listRooms: action.listRooms,
          listPlayers: action.listPlayers
      };
    case CREATE_ROOM:
      return {
        ...state,
        error: null,
          roomName: action.room,
          playerName: action.player,
          admin: true
      };
    case JOIN_ROOM:
      return {
        ...state, roomName: action.room, playerName: action.player, error: null
      };
    case IS_NEW_ADMIN:
      return {
        ...state, admin: action.admin
      };
    case CLEAN_ROOM_NAME:
      return {
        ...state, roomName: undefined, admin: false, error: null
      };
    default:
      return state;
  }
  // return state;
};

export default reducers;