import socketMiddleware from "../../client/middlewares/socketMiddleware";
import thunk from "redux-thunk";
import _ from "lodash";
import {
  CREATE_ROOM,
  JOIN_ROOM,
  LINE_BREAK,
  CLEAN_ROOM_NAME
} from "../../client/actions/actionsTypes";

const cb = (msg, data) => {
  if (data.error === true) {
  }
  if (data.spectator === true) {
  }
};

const mockEmit = (eventSocket, room1, player1, cb) => {
  cb("", { error: true, spectator: true });
};

const mockOn = (eventSocket, cb) => {
  cb();
};

const store1 = {
  getState: jest.fn(() => ({
    socket: {
      emit: mockEmit,
      on: mockOn
    },
    listRooms: ["room"]
  })),
  dispatch: jest.fn()
};

const removeListener = jest.fn();
const dispatch = jest.fn();

const store2 = {
  getState: jest.fn(() => ({
    socket: {
      emit: mockEmit,
      on: mockOn,
      disconnected: true,
      removeListener: removeListener
    },
    listRooms: ["room"]
  })),

  dispatch: dispatch
};

const create = _store => {
  const store = _.cloneDeep(_store);
  const next = jest.fn();
  // const action = { type: "TEST" };
  const thunk = socketMiddleware();

  const invoke = action => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe("SOCKETMIDDLEWARE.JS", () => {
  it("should remove listen", () => {
    const { invoke, next } = create(store2);
    const action = { type: CLEAN_ROOM_NAME };
    invoke(action);
    expect(next).toHaveBeenCalled();
    expect(removeListener).toHaveBeenCalled();
  });

  it("should call dispatch error and return the next action if state.socket.disconnected === true", () => {
    const { invoke, next } = create(store2);
    const action = { type: CLEAN_ROOM_NAME, eventSocket: null };
    invoke(action);
    expect(next).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalled();
  });

  it("should return the next action", () => {
    const { invoke, next } = create(store1);
    const action = { type: "TEST" };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action is a function", () => {
    const { invoke, next } = create(store1);
    const action = () => {
      return { type: "TEST" };
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action is a function", () => {
    const { invoke, next } = create(store1);
    const action = () => {
      return { type: "test" };
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action type is CREATE_ROOM", () => {
    const { invoke, next } = create(store1);

    const action = {
      type: CREATE_ROOM,
      eventSocket: null,
      room: "room"
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
    // expect(cb).toHaveBeenCalled();
  });

  it("should return the next action if action type is JOIN_ROOM", () => {
    const { invoke, next } = create(store1);

    const action = {
      type: JOIN_ROOM,
      eventSocket: null,
      room: "room"
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
    // expect(cb).toHaveBeenCalled();
  });

  it("should dispatch actionError and return the next action if the socket is disconnected", () => {
    const { invoke, next } = create(store2);
    const action = () => {
      return { type: "TEST" };
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action passing in default switch if action is not CREATEROOM or JOINROOM", () => {
    const { invoke, next } = create(store1);
    const action = () => {
      return { type: LINE_BREAK };
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });

  it("should return the next action if action type is default case", () => {
    const { invoke, next } = create(store1);

    const action = {
      type: "TEST",
      eventSocket: null
    };
    invoke(action);
    expect(next).toHaveBeenCalled();
  });
});
