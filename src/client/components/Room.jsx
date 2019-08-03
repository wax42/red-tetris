import React, { useEffect, useState } from "react";
import Game from "./Game";
import AppBoardInfo from "./AppBoardInfo";
import Spectrum from "./Spectrum";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import { lineBreak, nextPiece } from "../reducers/gameManager";

import {
  rotatePiece,
  downFloorPiece,
  downPiece,
  leftPiece,
  rightPiece
} from "../reducers/gridChange";

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

const handleKey = (dispatch, state, setState) => event => {
  console.log(event.keyCode);

  switch (event.keyCode) {
    case KEY_DOWN:
      event.preventDefault();
      setState(downPiece({ ...state }));
      console.log(state);
      // dispatch(actionPieceDown());
      break;
    case KEY_LEFT:
      event.preventDefault();
      setState(leftPiece({ ...state }));

      // dispatch(actionPieceLeft());
      break;
    case KEY_RIGHT:
      event.preventDefault();

      setState(rightPiece({ ...state }));

      // dispatch(actionPieceRight());
      break;
    case KEY_SPACE:
      event.preventDefault();
      setState(downFloorPiece({ ...state }));
      // dispatch(actionPieceSpace());
      break;
    case KEY_UP:
      event.preventDefault();
      setState(rotatePiece({ ...state }));
      // dispatch(actionPieceRotate());
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

  const [state, setState] = useState({
    socket: null,
    grid: [
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "2", "2", "2", "2", "2", "2", "2"]
    ],
    currentPiece: {
      x: 5,
      y: 0,
      piece: [
        [".", "1", ".", "."],
        [".", "1", "1", "."],
        [".", ".", "1", "."],
        [".", ".", ".", "."]
      ]
    },
    shadow: {
      x: 5,
      y: 0,
      piece: [
        [".", ".", ".", "0"],
        [".", ".", ".", "0"],
        [".", ".", ".", "0"],
        [".", ".", ".", "0"]
      ]
    },
    listPieces: [
      [
        [".", "1", ".", "."],
        [".", "1", ".", "."],
        [".", "1", ".", "."],
        [".", "1", ".", "."]
      ],
      [
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", "2", "2", "."],
        [".", "2", "2", "."]
      ],
      [
        [".", ".", "3", "3"],
        [".", ".", ".", "3"],
        [".", ".", ".", "3"],
        [".", ".", ".", "."]
      ]
    ],
    admin: false
  });

  // Key event Listenner
  useEffect(() => {
    const eventListner = handleKey(dispatch, state, setState);

    window.addEventListener("keydown", eventListner, false);

    return () => {
      window.removeEventListener("keydown", eventListner, false);
    };
  });

  console.log("Room components", state);

  const isLog = true; //A definir dans les classes + state
  if (isLog) {
    return (
      <div className="app">
        <div className="app-board">
          <AppBoardInfo />
          <Game state={state} />
        </div>

        <Spectrum className="app-spectrum" />
        <input type="text" onKeyPress={handleKey} />
      </div>
    );
  } else return <div />;
};

export default connect(mapStateToProps)(Room);
