import io from "socket.io-client";
import {
  START_GAME,
  PIECE_DOWN,
  CREATE_ROOM,
  LINE_BREAK,
  LIST_ROOM,
  ROOM_ADD_PLAYER,
  ROOM_DEL_PLAYER,
  SEND_SPECTRUM
} from "../actions/actionTypes";
import { actionPieceDown, actionPieceLeft } from "../actions/actions";

const socketMiddleware = () => {
  const socket = io("http://localhost:3001");

  return store => next => action => {
    console.log("MIDDLEWARE");

    //TODO Sécurité
    if (typeof action === "function") {
      console.error("passing function to the socket Middleware");
      return next(action);
    }

    if (action.event == undefined) {
      return next(action);
    }

    // Les events qui communiquents avec le serveur et / ou qui dispatch une action

    switch (action.type) {
      case START_GAME:
        let timeId = setInterval(() => {
          store.dispatch(actionPieceDown());
        }, 1000);
        store.dispatch(actionPieceDown());
        return next(action);
      case CREATE_ROOM:
        socket.emit("CREATE_ROOM", "{NAME OF THE FUCKING ROOM");
        break;
      case LINE_BREAK:
        socket.emit("ROOM line_break", "nbr de line break");
        break;
      case ROOM_ADD_PLAYER:
        socket.emit("ROOM ADD PLAYER", "nom du joueur");
        break;
      case ROOM_DEL_PLAYER:
        socket.emit("ROOM DELL PLAYER", "nom du joueur");
        break;
      case SEND_SPECTRUM:
        socket.emit("ROOM SEND_SPECTRUM", "le spectre de la grille");
        break;

      // listenner dans le state

      case LIST_ROOM:
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
