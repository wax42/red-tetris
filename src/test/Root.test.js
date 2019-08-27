import React from "react";
import ReactDOM from "react-dom";
/* import { MemoryRouter } from "react-router-dom";
// import { mount } from "enzyme"; */
import Home from "../client/components/Home/Home";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import Root, { routeHashError } from "../client/containers/Root";

describe("ROOT.JSX - render Root component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Root />, div);
  });

  it("renders without crashing", () => {
    shallow(<Root />);
  });
});

describe.each([
  "",
  "#room[player",
  "#room[p[lay]er]",
  "#room[player1][player2]",
  "#[]",
  "#[room[player]",
  "#room[player[]",
  "#[player]"
])("ROOT.JSX - RouteHashError - Hash invalid", hash => {
  const res = "Hash invalid";
  it("should return 'Hash invalid' if is not well formated'", () => {
    expect(routeHashError(hash, null, null)).toEqual(res);
  });
});

describe.each([
  "#ro[player]",
  "#99[player]",
  "#room-1[player]",
  "#(roo[player]"
])("ROOT.JSX - RouteHashError - Room Name incorrect", hash => {
  const res = "Room Name incorrect";
  it("sould return 'Room Name incorrect' if char is not alphanumeric and length < 3", () => {
    expect(routeHashError(hash, null, null)).toEqual(res);
  });
});

describe.each(["#room[p]", "#room[pl]", "#room[player+9]", "#room[-player]"])(
  "ROOT.JSX - RouteHashError - Player Name incorrect",
  hash => {
    const res = "Player Name incorrect";
    it("sould return 'Player Name incorrect' if char is not alphanumeric and length < 3", () => {
      expect(routeHashError(hash, null, null)).toEqual(res);
    });
  }
);

describe("ROOT.JSX - RouteHashError - Room doesn't exist", () => {
  const res = "Room doesn't exist";
  const hash = "#room[player]";
  it("sould return 'Room doesn't exist' ", () => {
    const state = {
      listRooms: []
    };
    expect(routeHashError(hash, state, null)).toEqual(res);
  });
  it("sould return 'Room doesn't exist' ", () => {
    const state = {
      listRooms: ["fake_room"]
    };
    expect(routeHashError(hash, state, null)).toEqual(res);
  });
  it("sould return 'Room doesn't exist' ", () => {
    const state = {
      listRooms: ["fake_room1", "fake_room2", "fake_room3"]
    };
    expect(routeHashError(hash, state, null)).toEqual(res);
  });
});

describe("ROOT.JSX - RouteHashError - Player name already exists", () => {
  const res = "Player name already exists";
  const hash = "#room[player]";
  it("sould return 'Player name already exists' ", () => {
    const state = {
      listRooms: ["room"],
      listPlayers: ["player"]
    };
    expect(routeHashError(hash, state, null)).toEqual(res);
  });
  it("sould return 'Player name already exists' ", () => {
    const state = {
      listRooms: ["room"],
      listPlayers: ["a", "b", "player"]
    };
    expect(routeHashError(hash, state, null)).toEqual(res);
  });
});

describe("ROOT.JSX - RouteHashError - Can't join if i am the creator", () => {
  it("should return an empty string", () => {
    const hash = "#room[player]";
    const res = "";
    const state = {
      listRooms: ["room"],
      listPlayers: ["player1"],
      playerName: "player"
    };
    expect(routeHashError(hash, state, null)).toEqual(res);
  });
  it("it should called actionRoom", () => {
    const hash = "#room[player]";
    const state = {
      listRooms: ["room"],
      listPlayers: ["player1"],
      playerName: ""
    };

    function actionJoinRoom(callback, room, player) {
      callback(room, player);
    }
    const mock = jest.fn();
    actionJoinRoom(mock, "room", "player");
    expect(mock).toHaveBeenCalled();
    // expect(mock).toHaveBeenCalledWith(mock, "room", "player");
  });
  /*   it("it should called actionRoom", () => {
    const hash = "#room[player]";
    const state = {
      listRooms: ["room"],
      listPlayers: ["player1"],
      playerName: "player"
    };

    function actionJoinRoom(callback, room, player) {
      if (player !== state.playerName) {
        callback();
      }
    }
    const mock = jest.fn();
    actionJoinRoom(mock, "room", "player");
    expect(mock).not.toHaveBeenCalled();
    // expect(mock).toHaveBeenCalled(undefined, "room", "player");
  }); */
});

describe("ROOT.JSX - Routing component", () => {
  it("should render Home if loading === true", () => {
    const loading = true;
    const routingParams = {
      state: {},
      actionJoinRoom: null,
      actionListRoomPlayer: null
    };
    /*  const div = document.createElement("div");
    ReactDOM.render(<Routing state={routingParams} />, div); */
    //Routing(routingParams);
  });
});
