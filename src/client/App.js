// import logo from './logo.svg';
import React from "react";
import Game from "./components/Game";
import AppBoardInfo from "./components/AppBoardInfo";
import Spectrum from "./components/Spectrum";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import socketMiddleware from "./middlewares/socketMiddleware";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";

import Home from "./components/Home";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  actionPieceDown,
  actionPieceLeft,
  actionPieceRight,
  actionPieceSpace,
  actionPieceRotate
} from "./actions/actions";

import io from "socket.io-client";

import { composeWithDevTools } from "redux-devtools-extension";
import { async } from "q";

/* let middleware = [a, b]
if (process.env.NODE_ENV !== 'production') {
  const c = require('./middlewares/socketMiddleware')
  const d = require('./middleware/another-debug-middleware')
  middleware = [...middleware, c, d]
} */

const KEY_SPACE = 32;
const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(socketMiddleware()))
);

const handleKey = dispatch => event => {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case KEY_DOWN:
      event.preventDefault();
      console.log("handle key down", event.keyCode);
      dispatch(actionPieceDown());
      break;
    case KEY_LEFT:
      event.preventDefault();
      console.log("handle key left", event.keyCode);
      dispatch(actionPieceLeft());
      break;
    case KEY_RIGHT:
      event.preventDefault();
      console.log("handle key right", event.keyCode);
      dispatch(actionPieceRight());
      break;
    case KEY_SPACE:
      event.preventDefault();
      console.log("handle key space", event.keyCode);
      dispatch(actionPieceSpace());
      break;
    case KEY_UP:
      event.preventDefault();
      console.log("handle key up", event.keyCode);
      dispatch(actionPieceRotate());
      break;
    default:
      console.log("event.Keycode", event.keyCode);
  }
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const eventListner = handleKey(dispatch);

    window.addEventListener("keydown", eventListner, false);

    return () => {
      window.removeEventListener("keydown", eventListner, false);
    };
  });

  const isLog = true; //A definir dans les classes + state
  if (isLog) {
    return (
      <div className="app">
        <div className="app-board">
          <AppBoardInfo />
          <Game />
        </div>
        <Spectrum className="app-spectrum" />
        <input type="text" onKeyPress={handleKey} />
      </div>
    );
  } else return <div />;
};

const mapStateToProps = state => {
  const _state = state;
  return _state;
};

const Routing = state => {
  const [listRooms, setListRooms] = useState([]);
  const [listPlayers, setListPlayers] = useState([]);

  useEffect(() => {
    const event = async () => {
      await state.socket.on("LIST_ROOMS_PLAYERS", (rooms, players) => {
        setListPlayers(players);
        setListRooms(rooms);
      });
    };
    event();
    console.log("updated component");
  });

  console.log("ListPlayer andd rooms", listPlayers, listRooms);

  let hash = window.location.hash;

  if (hash === "") {
    console.log("hash empty");
    return <Home />;
  }

  let result = hash.split("[");

  if (result.length != 2) {
    console.log("lenght");
    window.location.hash = "";
    return <Home error="hash Invalid" />;
  }

  let room_name = result[0].slice(1);
  let player_name = result[1].slice(0, -1);

  if (/^[A-z0-9]+$/.test(room_name) === false) {
    window.location.hash = "";
    console.log("room name invalid");

    return <Home error="Room Name incorrect" />;
  }

  if (/^[A-z0-9]+$/.test(player_name) === false) {
    window.location.hash = "";
    console.log("player name invalid");

    return <Home error="Player Name incorrect" />;
  }

  if (listRooms.includes(room_name) === false) {
    // window.location.hash = "";
    console.log("room don't exist", window.location.hash, window.location.path);

    return <Home error="Room don't exist" />;
  }

  if (
    listPlayers.includes(player_name) === true &&
    player_name !== state.playerName
  ) {
    window.location.hash = "";
    console.log("player already exist");

    return <Home error="Player name already exists" />;
  }

  if (state.playerName !== player_name) {
    console.log("JOIN ROOM");

    // Il va falloir creer / add un nouveau player a la room
    state.socket.emit("JOIN_ROOM", room_name, player_name, msg => {
      // TODO gestion d'erreur
      console.log(msg);
    });
  }
  return <App />;
};

const RoutingRedux = connect(mapStateToProps)(Routing);

const Root = () => {
  return (
    <Provider store={store}>
      <RoutingRedux />
    </Provider>
  );
};

export default Root;
