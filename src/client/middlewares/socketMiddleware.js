import {
  CREATE_ROOM,
  LINE_BREAK,
  LIST_ROOM_PLAYER,
  JOIN_ROOM
} from "../actions/actionTypes";
import { actionIsNewAdmin, actionIsSpectator } from "../actions/actions";
import eventSocket from "../../common/eventSocket";

const socketMiddleware = () => {
  console.error("START SOCKET MIDDLEWARE");
  return store => next => action => {
    console.log("MIDDLEWARE", action);

    //TODO Sécurité

    if (typeof action === "function") {
      console.error("passing function to the socket Middleware");
      return next(action);
    }

    let state = store.getState();
    console.log("Socket middleware", state);

    if (action.eventSocket === undefined) {
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
          msg => {
            // TODO gestion d'erreur
            // dispatch action error
            console.log("CREATE ROOOM", msg);
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
          (msg, game) => {
            // TODO gestion d'erreur
            // dispatch action error
            if (game === true) {
              store.dispatch(actionIsSpectator());
            }
            console.log("JOIN ROOOM", msg);
          }
        );
        state.socket.on(eventSocket.IS_NEW_ADMIN, () => {
          store.dispatch(actionIsNewAdmin());
          console.error("Je suis le nouvel admin");
        });
        break;
      case LINE_BREAK:
        state.socket.emit("ROOM line_break", "nbr de line break");
        break;
      default:
        break;
    }

    // SI l'action ne doit pas passer par le serveur

    // let event = "test_server";
    // //  Type --> actionType
    // let handle = "handle";
    // let handleEvent = handle;
    // if (typeof handleEvent === "string") {
    //   handleEvent = result => {
    //     console.log("Listenner", result);
    //     store.dispatch({ type: handle, result, test: "test" });
    //   };
    // }
    // return socket.on(event, handleEvent);
    return next(action);
  };
};

export default socketMiddleware;
