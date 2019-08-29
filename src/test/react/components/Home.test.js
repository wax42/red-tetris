import React from "react";
import {
  HomeCpt,
  buttonCreateRoom,
  mapStateToProps
} from "../../../client/components/Home/Home";
import { shallow } from "enzyme";
import ERROR from "../../../common/error";

describe("HOME.JSX", () => {
  it("should render self and subcomponent Home", () => {
    const setup = () => {
      const props = {
        state: {},
        actionCreateRoom: jest.fn(),
        error: ""
      };

      const enzymeWrapper = shallow(<HomeCpt />);

      return {
        props,
        enzymeWrapper
      };
    };
  });

  it("should set stateError to ERROR.ROOMNAME_INVALID_LENGTH if roomName < 3 or > 12", () => {
    let roomName = "ab";
    let playerName = "player1";
    let listPlayers = [];

    const action = jest.fn();
    const setStateError = jest.fn();
    buttonCreateRoom(action, setStateError, roomName, playerName, listPlayers);
    expect(setStateError).toHaveBeenCalledWith(ERROR.ROOMNAME_INVALID_LENGTH);
    roomName = "qbcdefghijklmnop";
    playerName = "player1";
    buttonCreateRoom(action, setStateError, roomName, playerName, listPlayers);
    expect(setStateError).toHaveBeenCalledWith(ERROR.ROOMNAME_INVALID_LENGTH);
  });

  it("should set stateError to ERROR.PLAYERNAME_INVALID_LENGTH if playerName < 3 or > 12", () => {
    let roomName = "room";
    let playerName = "ab";
    let listPlayers = [];

    const action = jest.fn();
    const setStateError = jest.fn();
    buttonCreateRoom(action, setStateError, roomName, playerName, listPlayers);
    expect(setStateError).toHaveBeenCalledWith(ERROR.PLAYERNAME_INVALID_LENGTH);
  });

  it("should set stateError to ERROR.ROOMNAME_INVALID if char are not alphanumerical", () => {
    let roomName = "room()";
    let playerName = "player1";
    let listPlayers = [];

    const action = jest.fn();
    const setStateError = jest.fn();
    buttonCreateRoom(action, setStateError, roomName, playerName, listPlayers);
    expect(setStateError).toHaveBeenCalledWith(ERROR.ROOMNAME_INVALID);
  });

  it("should set stateError to ERROR.PLAYERNAME_INVALID if char are not alphanumerical", () => {
    let roomName = "room";
    let playerName = "player+";
    let listPlayers = [];

    const action = jest.fn();
    const setStateError = jest.fn();
    buttonCreateRoom(action, setStateError, roomName, playerName, listPlayers);
    expect(setStateError).toHaveBeenCalledWith(ERROR.PLAYERNAME_INVALID);
  });

  it("should set stateError to ERROR.PLAYERNAME_INEXISTANT if player name is already use", () => {
    let roomName = "room";
    let playerName = "player1";
    let listPlayers = ["player1"];

    const action = jest.fn();
    const setStateError = jest.fn();
    buttonCreateRoom(action, setStateError, roomName, playerName, listPlayers);
    expect(setStateError).toHaveBeenCalledWith(ERROR.PLAYERNAME_INEXISTANT);
  });

  it("should set the correct hash if roomName and playerName are well formated", () => {
    let roomName = "room";
    let playerName = "player1";
    let listPlayers = [];

    const action = jest.fn();
    const setStateError = jest.fn();
    buttonCreateRoom(action, setStateError, roomName, playerName, listPlayers);
    expect(setStateError).not.toHaveBeenCalled();
    expect(action).toHaveBeenCalled();
  });

  it("should return the listPlayers and listRooms of the state", () => {
    const listPlayers = ["player1", "player2"];
    const listRooms = ["room"];
    const state = {
      listPlayers: ["player1", "player2"],
      listRooms: ["room"]
    };
    expect(mapStateToProps(state)).toEqual({ listPlayers, listRooms });
  });
});
