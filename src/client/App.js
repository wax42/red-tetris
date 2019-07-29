// import logo from './logo.svg';
import React from "react";
import Game from "./components/Game";
import AppBoardInfo from "./components/AppBoardInfo";
import Spectrum from "./components/Spectrum";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import socketMiddleware from "./middlewares/socketMiddleware";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { pieceDown } from './actions/actions'

const KEY_SPACE = 32;
const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const store = createStore(reducers, applyMiddleware(socketMiddleware()));


const handleKey = (dispatch) => (event) => {
  console.log(event.keyCode);
  switch (event.keyCode) {
    case KEY_DOWN:
      console.log("handle key down");
      dispatch(pieceDown())
  }
}


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const eventListner = handleKey(dispatch);

    window.addEventListener(
      'keydown',
      eventListner,
      false,
    );

    return () => {
      window.removeEventListener(
        'keydown',
        eventListner,
        false,
      );
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
        <input type="text" onKeyPress={handleKey}/>
      </div>
    );
  } else return <div />;
};

const Routing = () => {
  console.log(window.location.hash);
  if (true) {
    return <App />;
  } else {
    return <Home />;
  }
};

const Root = () => {
  const url = "/toto"; // Lire dans le state
  console.log(window.location.hash);
  return (
    <Provider store={store}>
      <Routing />
      {/* path={url} component={App} /> exact path="/" component={Home} /> */}
    </Provider>
  );
};

export default Root;
