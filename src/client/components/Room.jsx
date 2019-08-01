import React, { useEffect } from "react";
import Game from "./Game";
import AppBoardInfo from "./AppBoardInfo";
import Spectrum from "./Spectrum";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import {
  actionPieceDown,
  actionPieceLeft,
  actionPieceRight,
  actionPieceSpace,
  actionPieceRotate
} from "../actions/actions";
import { statement } from "@babel/template";

const KEY_SPACE = 32;
const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

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

const mapStateToProps = state => {
  return { socket: state.socket, roomName: state.roomName };
};

const Room = ({ socket, roomName }) => {
  const dispatch = useDispatch();

  // Key event Listenner
  useEffect(() => {
    const eventListner = handleKey(dispatch);

    window.addEventListener("keydown", eventListner, false);

    return () => {
      window.removeEventListener("keydown", eventListner, false);
    };
  });

  // Room listenner
  useEffect(() => {
    socket.on("blabla", msg => {
      console.error("Le message en meme temps: ", msg);
    });
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

export default connect(mapStateToProps)(Room);
