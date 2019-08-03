import React, { useEffect } from "react";
import Game from "./Game";
import AppBoardInfo from "./AppBoardInfo";
import Spectrum from "./Spectrum";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import eventSocket from "../../common/common";

import {
  actionPieceDown,
  actionPieceLeft,
  actionPieceRight,
  actionPieceSpace,
  actionPieceRotate,
  actionNextPiece
} from "../actions/actions";

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
      dispatch(actionPieceDown());
      break;
    case KEY_LEFT:
      event.preventDefault();
      dispatch(actionPieceLeft());
      break;
    case KEY_RIGHT:
      event.preventDefault();
      dispatch(actionPieceRight());
      break;
    case KEY_SPACE:
      event.preventDefault();
      dispatch(actionPieceSpace());
      break;
    case KEY_UP:
      event.preventDefault();
      dispatch(actionPieceRotate());
      break;
    default:
      break;
  }
};

const mapStateToProps = state => {
  return {
    socket: state.socket,
    roomName: state.roomName,
    nextPieceEvent: state.nextPieceEvent
  };
};

const Room = ({ socket, nextPieceEvent, roomName }) => {
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
    /*  if (nextPieceEvent) {
      console.log("la chatte du cul");
      socket.emit(eventSocket.NEXT_PIECE, newPiece => {
        console.log("la bite du cul");
        dispatch(actionNextPiece(newPiece));
      });
    } */

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
