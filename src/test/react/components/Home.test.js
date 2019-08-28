import React from "react";
import Home, {
  HomeCpt,
  getRoomName,
  getPlayerName,
  buttonCreateRoom
} from "../../../client/components/Home/Home";
import { shallow } from "enzyme";

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
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("Title")).toBeTruthy();
    expect(enzymeWrapper.find("Info")).toBeTruthy();
  });

  it("should set the value of the roomName", () => {
    let roomName = "";
    const event = {
      target: {
        value: "room"
      }
    };
    getRoomName(event);
  });

  it("should set the value of the playerName", () => {
    let playerName = "";
    const event = {
      target: {
        value: "player"
      }
    };
    getPlayerName(event);
  });

  it("should set stateError if roomName < 3", () => {
    let roomName = "ab";
    let stateError = "";
    const action = jest.fn();
    const setStateError = msg => {
      stateError = msg;
    };
    buttonCreateRoom(
      action,
      setStateError("Room name should have 3 characters at least")
    );
  });
});
