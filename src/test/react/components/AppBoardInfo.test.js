import React from "react";
import AppBoardInfo, {
  Title,
  Info,
  Play,
  mapStateToProps,
  buttonPlay
} from "../../../client/components/AppBoardInfo";
import { shallow } from "enzyme";

describe("APPBOARDINFO.JSX", () => {
  it("should render self and subcomponent AppBoardInfo", () => {
    const setup = () => {
      const props = {
        state: {},
        dispatchRoom: jest.fn()
      };

      const enzymeWrapper = shallow(<AppBoardInfo />);

      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("Title")).toBeTruthy();
    expect(enzymeWrapper.find("Info")).toBeTruthy();
  });

  it("should render self and subcomponent Title", () => {
    const setup = () => {
      const props = {};
      const enzymeWrapper = shallow(<Title />);
      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("Title")).toBeTruthy();
    expect(enzymeWrapper.find("div").hasClass("title")).toBeTruthy();
  });

  it("should render self and subcomponent Info", () => {
    const setup = () => {
      const props = {
        state: {},
        dispatchRoom: jest.fn(),
        winner: ""
      };
      const enzymeWrapper = shallow(<Info {...props} />);
      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("div").hasClass("info")).toBeTruthy();
    expect(enzymeWrapper.find("Info")).toBeTruthy();
  });

  it("should render self and subcomponent Play if admin === true", () => {
    const setup = () => {
      const props = {
        state: {},
        dispatchRoom: jest.fn(),
        winner: "",
        admin: true
      };
      const enzymeWrapper = shallow(<Play {...props} />);
      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("Title")).toBeTruthy();
    expect(enzymeWrapper.find("Info")).toBeTruthy();
  });

  it("should render self and subcomponent Play if admin === false", () => {
    const setup = () => {
      const props = {
        state: {},
        dispatchRoom: jest.fn(),
        winner: "",
        admin: false
      };
      const enzymeWrapper = shallow(<Play {...props} />);
      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("button")).toBeTruthy();
  });

  it("should return the admin property of state", () => {
    const state = {
      state: {},
      dispatchRoom: jest.fn(),
      winner: "",
      admin: false
    };
    expect(mapStateToProps(state)).toMatchObject({ admin: false });
    // expect(enzymeWrapper.find("Info")).toBe();
  });

  it("should dispatch action and call lauchGame if the user click", () => {
    const dispatchRoom = jest.fn();
    const listPlayers = ["player1", "player2"];
    const listPieces = [""];
    const emit = (listPlayers, listPieces) => {
      dispatchRoom();
    };
    const state = {
      dispatchRoom: jest.fn(),
      winner: "",
      admin: false,
      clearInterval: -1,
      socket: {
        emit
      }
    };
    buttonPlay(state, dispatchRoom);
    expect(dispatchRoom).toHaveBeenCalled();
    // expect(enzymeWrapper.find("Info")).toBe();
  });
});