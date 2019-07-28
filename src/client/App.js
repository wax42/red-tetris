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

const store = createStore(reducers, applyMiddleware(socketMiddleware()));

const App = () => {
  const isLog = true; //A definir dans les classes + state
  if (isLog) {
    return (
      <div className="app">
        <div className="app-board">
          <AppBoardInfo />
          <Game />
        </div>
        <Spectrum className="app-spectrum" />
      </div>
    );
  } else return <div />;
};

const Root = () => {
  const url = "/toto"; // Lire dans le state
  console.log(window.location.hash);
  return (
    <Provider store={store}>
      <Router>
        <Route path={url} component={App} />
        <Route exact path="/" component={Home} />
      </Router>
    </Provider>
  );
};

export default Root;
