import React from "react";
import AppBoardInfo, {
  Title,
  Info,
  Play,
  mapStateToProps,
  buttonPlay,
  leaveRoom,
  StyleSpectator,
  ScoreTable
} from "../../../client/components/Room/AppBoardInfo";
import { shallow } from "enzyme";

describe("APPBOARDINFO.JSX", () => {
  it("should render self and subcomponent ScoreTAble", () => {
    const setup = () => {
      const state = {
        playerName: "test",
        listSpectrums: {
          test: {
            playerName: "test",
            score: 0,
            nb_win: 0,
            spectator: true
          }
        }
      };
      const enzymeWrapper = shallow(
        <ScoreTable state={state} spectator="true" />
      );
      return {
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("ScoreTable")).toBeTruthy();
  });

  it("should render self and subcomponent StyleSpectator", () => {
    const setup = () => {
      const props = {
        spectator: true
      };
      const enzymeWrapper = shallow(<StyleSpectator />);
      return {
        props,
        enzymeWrapper
      };
    };
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find("StyleSpectator")).toBeTruthy();
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
    // expect(enzymeWrapper.find("div").hasClass("info")).toBeTruthy();
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
    expect(mapStateToProps(state)).toMatchObject({
      admin: false
    });
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
  it("should test the Leave Room", () => {
    let dispatch = jest.fn();
    let state = {
      socket: {
        emit: jest.fn()
      }
    };
    leaveRoom(state, dispatch);
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

  it("should dispatch action and reset the hash to empty", () => {
    const dispatch = jest.fn();
    const emit = jest.fn();
    const window = {
      location: {
        hash: "room[player]"
      }
    };

    const state = {
      socket: {
        emit
      }
    };
    leaveRoom(state, dispatch);
    expect(dispatch).toHaveBeenCalled();
    expect(emit).toHaveBeenCalled();
  });
});
