import {
  START_GAME,
  CREATE_ROOM,
  LINE_BREAK,
  LIST_ROOM,
  ROOM_ADD_PLAYER,
  ROOM_DEL_PLAYER,
  SEND_SPECTRUM,
  JOIN_ROOM
} from "../actions/actionTypes";
import { actionPieceDown } from "../actions/actions";
import EVENT from "../../common/common";

const socketMiddleware = () => {
  console.error("START SOCKET MIDDLEWARE");
  return store => next => action => {
    console.log("MIDDLEWARE");

    //TODO Sécurité
    if (typeof action === "function") {
      console.error("passing function to the socket Middleware");
      return next(action);
    }

    if (action.event === undefined) {
      return next(action);
    }

    // Les events qui communiquents avec le serveur et / ou qui dispatch une action

    let state = store.getState();
    switch (action.type) {
      case START_GAME:
        setInterval(() => {
          store.dispatch(actionPieceDown());
        }, 1000);
        store.dispatch(actionPieceDown());
        return next(action);
      case CREATE_ROOM:
        console.log("Send CREATE_ROOM", action);
        state.socket.emit(
          EVENT.CREATE_ROOM,
          action.room,
          action.player,
          msg => {
            // TODO gestion d'erreur
            // dispatch action error
            console.log(msg);
          }
        );
        break;
      case JOIN_ROOM:
        console.log("Send JOIN_ROOM", action);
        state.socket.emit(
          EVENT.JOIN_ROOM,
          action.room,
          action.player,
          msg => {
            // TODO gestion d'erreur

            // dispatch action error
            console.log(msg);
          }
        );
        break;
      case LINE_BREAK:
        state.socket.emit("ROOM line_break", "nbr de line break");
        break;
      case ROOM_ADD_PLAYER:
        state.socket.emit("ROOM ADD PLAYER", "nom du joueur");
        break;
      case ROOM_DEL_PLAYER:
        state.socket.emit("ROOM DELL PLAYER", "nom du joueur");
        break;
      case SEND_SPECTRUM:
        state.socket.emit("ROOM SEND_SPECTRUM", "le spectre de la grille");
        break;

      // listenner dans le state

      case LIST_ROOM:
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
