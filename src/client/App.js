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

import HomeRedux from "./components/Home";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  actionPieceDown,
  actionPieceLeft,
  actionPieceRight,
  actionPieceSpace,
  actionPieceRotate
} from "./actions/actions";

import { composeWithDevTools } from "redux-devtools-extension";

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
  const test = state;
  console.log("Nique ton state", test);
  return test;
};

const Routing = state => {
  let lists_room = ["test", "test0", "test2", "test1"];
  // socket event  on recuper la listes des rooms
  // socket event  on recuper la listes des joueurs
  let list_players = ["jack", "dennis", "alfred", "roger", "henri", "bobby"];

  let room = "e";
  console.log(window.location.hash);
  console.log("fdp", window.location.path);
  console.log("hash", window.location.hash);

  // Regarder dans le state si la room est excistante

  // Sinon rediriger vers '/'

  // let hash = window.location.hash;

  let hash = window.location.hash;
  let result = hash.split("[");

  let error = false;
  if (result.length == 2) {
    let room_name = result[0].slice(1);
    let player_name = result[1].slice(0, -1);

    if (
      /^[A-z0-9]+$/.test(room_name) === false ||
      /^[A-z0-9]+$/.test(player_name) === false ||
      lists_room.includes(room_name) === false ||
      list_players.includes(player_name) === true
    ) {
      error = true;
      return <HomeRedux />; // with the errror
    } else {
      // Il va falloir creer / add un nouveau player a la room
      return <App />;
    }
  } else {
    return <HomeRedux />;
  }
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
