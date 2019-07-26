// import logo from './logo.svg';
import React from "react";
import Game from "./components/Game";
import AppBoardInfo from "./components/AppBoardInfo";
import Spectrum from "./components/Spectrum";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import socketMiddleware from "./middlewares/socketMiddleware";

const store = createStore(reducers,
  applyMiddleware(socketMiddleware()));

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="app-board">
          <AppBoardInfo />
          <Game />
        </div>
        <Spectrum className="app-spectrum" />
      </div>
    </Provider>
  );
};

export default App;
