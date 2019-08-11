import eventSocket from "../../common/eventSocket";
import {
  CREATE_ROOM,
  JOIN_ROOM,
  LIST_ROOM_PLAYER,
  IS_NEW_ADMIN,
  IS_SPECTATOR,
  CLEAN_ROOM_NAME
} from "../../client/actions/actionTypes";
import {
  actionIsSpectator,
  actionIsNewAdmin,
  actionListRoomPlayer,
  actionCreateRoom,
  actionJoinRoom,
  actionCleanRoomName
} from "../../client/actions/actions";

describe("ACTION.JS", () => {
  it("should return action type spectator", () => {
    const action = { type: IS_SPECTATOR };
    expect(actionIsSpectator()).toEqual(action);
  });

  it("should return action type newAdmin", () => {
    const action = { type: IS_NEW_ADMIN };
    expect(actionIsNewAdmin()).toEqual(action);
  });

  it("should return action type listRoomPlayer", () => {
    const listRooms = ["room1", "room2"];
    const listPlayers = ["player1", "player2"];
    const action = {
      type: LIST_ROOM_PLAYER,
      listRooms: listRooms,
      listPlayers: listPlayers
    };
    expect(actionListRoomPlayer(listRooms, listPlayers)).toEqual(action);
  });

  it("should return action type createRoom", () => {
    const room = "room";
    const player = "player";
    const action = {
      type: CREATE_ROOM,
      room: room,
      player: player,
      eventSocket: eventSocket.CREATE_ROOM
    };
    expect(actionCreateRoom(room, player)).toEqual(action);
  });

  it("should return action type joinRoom", () => {
    const room = "room";
    const player = "player";
    const action = {
      type: JOIN_ROOM,
      room: room,
      player: player,
      eventSocket: eventSocket.JOIN_ROOM
    };
    expect(actionJoinRoom(room, player)).toEqual(action);
  });

  it("should return action type cleanRoomName", () => {
    const action = { type: CLEAN_ROOM_NAME };
    expect(actionCleanRoomName()).toEqual(action);
  });
});
