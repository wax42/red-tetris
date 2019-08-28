import React from "react";
import {
  HomeCpt,
  buttonCreateRoom,
  mapStateToProps
} from "../../../client/components/Home/Home";
import {
  shallow
} from "enzyme";

describe("HOME.JSX", () => {
  it("should render self and subcomponent Home", () => {
    const setup = () => {
      const props = {
        state: {},
        actionCreateRoom: jest.fn(),
        error: ""
      };

      const enzymeWrapper = shallow( < HomeCpt / > );

      return {
        props,
        enzymeWrapper
      };
    };
  });



  it("should receive  listPlayers and listRooms", () => {
    let _state = {
      listPlayers: "a",
      listRooms: "a",
    };
    let state = mapStateToProps(_state);
    expect(_state).toEqual(state);
  })

  it("should set stateError  ERROR.PLAYERNAME_INEXISTANT  ", () => {
    let roomName = "roda";
    let playerName = "test";
    let listPlayers = ["test"];
    const action = jest.fn();
    const setStateError = msg => {};

    buttonCreateRoom(
      action,
      setStateError,
      roomName, playerName, listPlayers
    );
  });


  it("should set stateError   ERROR.PLAYER_INVALID", () => {
    let roomName = "roda";
    let playerName = "+_ser";
    let listPlayers = [];
    const action = jest.fn();
    const setStateError = msg => {};

    buttonCreateRoom(
      action,
      setStateError,
      roomName, playerName, listPlayers
    );
  });

  it("should set stateError   ERROR.ROOMNAME_INVALID", () => {
    let roomName = "ro-_da";
    let playerName = "ersda";
    let listPlayers = [];
    const action = jest.fn();
    const setStateError = msg => {};

    buttonCreateRoom(
      action,
      setStateError,
      roomName, playerName, listPlayers
    );
  });


  it("should set stateError ERROR.PLAYERNAME_INVALID_LENGTH", () => {
    let roomName = "rooda";
    let playerName = "er";
    let listPlayers = [];
    const action = jest.fn();
    const setStateError = msg => {};

    buttonCreateRoom(
      action,
      setStateError,
      roomName, playerName, listPlayers
    );
  });


  it("should set stateError ERROR.ROOMNAME_INVALID_LENGTH", () => {
    let roomName = "roomasdasdsadsasda";
    let playerName = "player";
    let listPlayers = [];
    const action = jest.fn();
    const setStateError = msg => {};

    buttonCreateRoom(
      action,
      setStateError,
      roomName, playerName, listPlayers
    );
  });

  it("should create room", () => {
    let roomName = "room";
    let playerName = "player";
    let listPlayers = [];
    const action = jest.fn();
    const setStateError = msg => {};

    buttonCreateRoom(
      action,
      setStateError,
      roomName, playerName, listPlayers
    );
  });
});