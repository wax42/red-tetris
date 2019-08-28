import {
  CREATE_ROOM,
  JOIN_ROOM,
  LIST_ROOM_PLAYER,
  IS_NEW_ADMIN,
  IS_SPECTATOR,
  CLEAN_ROOM_NAME
} from "../../client/actions/actionsTypes";

import {
  actionIsSpectator,
  actionIsNewAdmin,
  actionListRoomPlayer,
  actionCreateRoom,
  actionJoinRoom,
  actionCleanRoomName
} from "../../client/actions/actions";

import reducers from "../../client/reducers/reducers";

describe("REDUCERS.JS", () => {
  const state = {
    socket: new WebSocket("ws://localhost:8080"),
    admin: false,
    spectator: false,
    listRooms: [],
    listPlayers: [],
    timeId: null,
    nextPieceEvent: false
  };
  it("should return the new state if action IS_SPECTATOR", () => {
    const newState = {
      ...state,
      spectator: !state.spectator
    };
    expect(reducers(state, actionIsSpectator())).toEqual(newState);
  });

  it("should return the new state if action LIST_ROOM_PLAYER ", () => {
    const listRooms = ["room"];
    const listPlayers = ["player1"];
    const newState = {
      ...state,
      listRooms,
      listPlayers
    };
    expect(
      reducers(state, actionListRoomPlayer(listRooms, listPlayers))
    ).toEqual(newState);
  });

  it("should return the new state if action CREATE_ROOM ", () => {
    const actionCreateRoom = (room, player) => {
      return {
        type: CREATE_ROOM,
        room: room,
        player: player,
        eventSocket: undefined
      };
    };
    const room = "room";
    const player = "player1";
    const newState = {
      ...state,
      roomName: room,
      playerName: player,
      admin: true
    };
    expect(reducers(state, actionCreateRoom(room, player))).toEqual(newState);
  });

  it("should return the new state if action JOIN_ROOM", () => {
    const actionJoinRoom = (room, player) => {
      return {
        type: JOIN_ROOM,
        room: room,
        player: player,
        eventSocket: undefined
      };
    };
    const room = "room";
    const player = "player1";
    const newState = {
      ...state,
      roomName: room,
      playerName: player
    };
    expect(reducers(state, actionJoinRoom(room, player))).toEqual(newState);
  });

  it("should return the new state if action IS_NEW_ADMIN", () => {
    const newState = {
      ...state,
      admin: true
    };
    expect(reducers(state, actionIsNewAdmin())).toEqual(newState);
  });

  it("should return the new state if action CLEAN_ROOM_NAME", () => {
    const newState = { ...state, roomName: undefined };
    expect(reducers(state, actionCleanRoomName())).toEqual(newState);
  });

  it("shoud return the state unmodified if action.eventSocket is defined", () => {
    const room = "room";
    const player = "player1";
    expect(reducers(state, actionJoinRoom(room, player))).toEqual(state);
  });
});
