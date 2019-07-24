import React from "react";
// import logo from './logo.svg';
import Game from "./components/Game";
import AppBoardInfo from "./components/AppBoardInfo";
import Spectrum from "./components/Spectrum";

const App = () => {
  return (
    <div className="app">
      <div className="app-board">
        <AppBoardInfo />
        <Game />
      </div>
      <Spectrum className="app-spectrum" />
    </div>
  );
};

export default App;
