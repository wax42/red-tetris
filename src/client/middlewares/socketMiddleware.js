import {
  CREATE_ROOM,
  LINE_BREAK,
  LIST_ROOM_PLAYER,
  JOIN_ROOM
} from "../actions/actionTypes";
import {
  actionIsNewAdmin,
  actionIsSpectator,
  actionError
} from "../actions/actions";
import eventSocket from "../../common/eventSocket";

const socketMiddleware = () => {
  // console.error("START SOCKET MIDDLEWARE");
  return store => next => action => {
    console.log("MIDDLEWARE", action);


    if (typeof action === "function") {
      console.error("passing function to the socket Middleware");
      return next(action);
    }

    let state = store.getState();


    console.log("Socket middleware", state);

    if (action.eventSocket === undefined) {
      return next(action);
    }

    if (state.socket.disconnected === true) {
      store.dispatch(actionError("Server disconnected"))
      return next(action);
    }

    switch (action.type) {
      case CREATE_ROOM:
        action.eventSocket = undefined;
        console.log("Send CREATE_ROOM", action);
        state.socket.emit(
          eventSocket.CREATE_ROOM,
          action.room,
          action.player,
          (msg, data) => {
            if (data.error === true) {
              store.dispatch(actionError(msg));
            }
            if (data.admin === false) {
              store.dispatch(actionIsNewAdmin(false));
            }
            if (data.spectator === true) {
              store.dispatch(actionIsSpectator());
            }
            console.log("CREATE ROOOM", msg, data);
          }
        );
        break;
      case JOIN_ROOM:
        action.eventSocket = undefined;
        console.log("Send JOIN_ROOM", action);
        state.socket.emit(
          eventSocket.JOIN_ROOM,
          action.room,
          action.player,
          (msg, data) => {
            if (data.error === true) {
              store.dispatch(actionError(msg));
            }
            if (data.spectator === true) {
              store.dispatch(actionIsSpectator());
            }
            console.log("JOIN ROOOM", msg);
          }
        );
        state.socket.on(eventSocket.IS_NEW_ADMIN, () => {
          store.dispatch(actionIsNewAdmin(true));
          console.error("Je suis le nouvel admin");
        });
        break;
      case LINE_BREAK:
        state.socket.emit("ROOM line_break", "nbr de line break");
        break;
      default:
        break;
    }
    return next(action);
  };
};

export default socketMiddleware;