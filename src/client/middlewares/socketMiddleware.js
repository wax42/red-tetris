import io from "socket.io-client";
import { START_GAME, PIECE_DOWN } from "../actions/actionTypes";
import { actionPieceDown, actionPieceLeft } from "../actions/actions";

const socketMiddleware = () => {
  const socket = io("http://localhost:3001");

  return store => next => action => {
    //TODO Sécurité
    if (typeof action === "function") {
      return next(action);
    }

    // SI l'action ne doit pas passer par le serveur
    if (action.type == START_GAME) {
      let timeId = setInterval(() => {
        store.dispatch(actionPieceDown());
      }, 1000);
      store.dispatch(actionPieceDown());
      return next(action);
    }

    if (action.event == undefined) {
      return next(action);
    }
    let event = "test_server";

    /* let leave = false;
    if (leave) {
      socket.removeListener(event);
    } */
    console.log("SocketMiddlware");

    //  Type --> actionType
    let handle = "handle";
    let handleEvent = handle;
    if (typeof handleEvent === "string") {
      handleEvent = result => {
        console.log("Listenner", result);
        store.dispatch({ type: handle, result, test: "test" });
      };
    }
    return socket.on(event, handleEvent);
  };
};

export default socketMiddleware;
