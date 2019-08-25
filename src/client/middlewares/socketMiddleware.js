import {
  CREATE_ROOM,
  JOIN_ROOM
} from "../actions/actionsTypes";
import {
  actionIsNewAdmin,
  actionIsSpectator,
  actionError
} from "../actions/actionsRedux";
import eventSocket from "../../common/eventSocket";
import ERROR from "../../common/error"

const socketMiddleware = () => {
  return store => next => action => {

    let state = store.getState();
    if (action.eventSocket === undefined) {
      return next(action);
    }

    if (state.socket.disconnected === true) {
      store.dispatch(actionError(ERROR.SERVER_DOWN))
      return next(action);
    }

    switch (action.type) {
      case CREATE_ROOM:
        action.eventSocket = undefined;
        state.socket.emit(
          eventSocket.CREATE_ROOM,
          action.room,
          action.player,
          (msg, data) => {
            if (data.error === true) store.dispatch(actionError(msg));
            if (data.admin === false) store.dispatch(actionIsNewAdmin(false));
            if (data.spectator === true) store.dispatch(actionIsSpectator());
          }
        );
        break;
      case JOIN_ROOM:
        action.eventSocket = undefined;
        state.socket.emit(
          eventSocket.JOIN_ROOM,
          action.room,
          action.player,
          (msg, data) => {
            if (data.error === true) store.dispatch(actionError(msg));
            if (data.spectator === true) store.dispatch(actionIsSpectator());
          }
        );
        state.socket.on(eventSocket.IS_NEW_ADMIN, () => store.dispatch(actionIsNewAdmin(true)));
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default socketMiddleware;