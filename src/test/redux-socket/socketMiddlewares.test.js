import socketMiddleware from "../../client/middlewares/socketMiddleware";
import thunk from "redux-thunk";
import {
  CREATE_ROOM,
  JOIN_ROOM,
  LINE_BREAK
} from "../../client/actions/actionTypes";

const create = () => {
  const mockEmit = (eventSocket, room, player, cb) => {
    cb();
  };
  const mockOn = (eventSocket, cb) => {
    cb();
  };
  const store = {
    getState: jest.fn(() => ({
      socket: {
        emit: mockEmit,
        on: mockOn
      }
    })),
    dispatch: jest.fn()
  };
  const next = jest.fn();
  const action = { type: "TEST" };
  const thunk = socketMiddleware();

  const invoke = action => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe("SOCKETMIDDLEWARE.JS", () => {
  it("should return the next action", () => {
    const { invoke, next } = create();
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action is a function", () => {
    const { invoke, next } = create();
    const action = () => {
      return { type: "TEST" };
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action is a function", () => {
    const { invoke, next } = create();
    const action = () => {
      return { type: "TEST" };
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action type is CREATE_ROOM", () => {
    const { invoke, next } = create();

    const action = {
      type: CREATE_ROOM,
      eventSocket: null
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action type is JOIN_ROOM", () => {
    const { invoke, next } = create();

    const action = {
      type: JOIN_ROOM,
      eventSocket: null
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action type is LINE_BREAK", () => {
    const mockEmit = (a, b) => {};
    const store = {
      getState: jest.fn(() => ({
        socket: {
          emit: mockEmit
        }
      })),
      dispatch: jest.fn()
    };
    const next = jest.fn();
    const thunk = socketMiddleware();

    const invoke = action => thunk(store)(next)(action);
    const action = {
      type: LINE_BREAK,
      eventSocket: null
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action type is default case", () => {
    const { invoke, next } = create();

    const action = {
      type: "TEST",
      eventSocket: null
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });
});
