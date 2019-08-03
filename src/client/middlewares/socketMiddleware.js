import {
  CREATE_ROOM,
  LINE_BREAK,
  LIST_ROOM_PLAYER,
  SEND_SPECTRUM,
  JOIN_ROOM
} from "../actions/actionTypes";
import { actionIsNewAdmin } from "../actions/actions";
import eventSocket from "../../common/common";

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
            console.log(msg);
          }
        );

        break;
      case JOIN_ROOM:
        action.eventSocket = undefined;

        // del eventSocket in action
        console.log("Send JOIN_ROOM", action);
        state.socket.emit(
          eventSocket.JOIN_ROOM,
          action.room,
          action.player,
          msg => {
            // TODO gestion d'erreur

            // dispatch action error
            console.log(msg);
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
      case SEND_SPECTRUM:
        state.socket.emit("ROOM SEND_SPECTRUM", "le spectre de la grille");
        break;

      // listenner dans le state

      case LIST_ROOM_PLAYER:
        console.log(
          "Socket middleware create Listenner LIST ROOM PLAYER",
          action
        );
        state.socket.on("LIST_ROOMS_PLAYERS", (rooms, players) => {
          console.log("on a enntendu henri LIST_ROOMS_PLAYERS");

          action.eventSocket = undefined;
          store.dispatch({ ...action, listRooms: rooms, listPlayers: players });
        });
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
