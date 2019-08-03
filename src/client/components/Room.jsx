import React, { useEffect, useReducer } from "react";
import Game from "./Game";
import AppBoardInfo from "./AppBoardInfo";
import Spectrum from "./Spectrum";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE,
  NEXT_PIECE
} from "../actions/actionTypes";
import { launchGame } from "../gameManager";

import {
  rotatePiece,
  downFloorPiece,
  downPiece,
  leftPiece,
  rightPiece
} from "../gridChange";

import eventSocket from "../../common/common";

import {
  actionNextPiece,
  actionPieceDown,
  actionPieceLeft,
  actionPieceRight,
  actionPieceRotate,
  actionPieceSpace
} from "../actions/actionRoom";

const KEY_SPACE = 32;
const KEY_DOWN = 40;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;

const handleKey = (state, dispatchRoom, socket) => event => {
  switch (event.keyCode) {
    case KEY_DOWN:
      event.preventDefault();
      dispatchRoom(actionPieceDown(socket));
      // setState(downPiece(newState, socket));
      break;
    case KEY_LEFT:
      event.preventDefault();
      dispatchRoom(actionPieceLeft());
      // setState(leftPiece(newState));
      break;
    case KEY_RIGHT:
      event.preventDefault();
      dispatchRoom(actionPieceRight());
      // setState(rightPiece(newState));
      break;
    case KEY_SPACE:
      event.preventDefault();
      dispatchRoom(actionPieceSpace(socket));
      // setState(downFloorPiece(newState, socket));
      console.log("KEY BHOOOK", JSON.stringify(state.grid));
      break;
    case KEY_UP:
      event.preventDefault();
      dispatchRoom(actionPieceRotate());

      // setState(rotatePiece(newState));
      break;
    default:
      break;
  }
};

const mapStateToProps = state => {
  return {
    socket: state.socket,
    roomName: state.roomName
  };
};

const reduceRoom = (state, action) => {
  switch (action.type) {
    case PIECE_DOWN:
      return downPiece({ ...state }, action.socket);
    case PIECE_LEFT:
      return leftPiece({ ...state });
    case PIECE_RIGHT:
      return rightPiece({ ...state });
    case PIECE_SPACE:
      return downFloorPiece({ ...state }, action.socket);
    case PIECE_ROTATE:
      return rotatePiece({ ...state });
    case NEXT_PIECE:
      return { ...state, listPieces: [...state.listPieces, action.piece] };
  }
};

const Room = ({ socket, roomName }) => {
  const dispatch = useDispatch();

  const initialState = {
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
    admin: false,
    lose: false
  };
  const [state, dispatchRoom] = useReducer(reduceRoom, initialState);

  // Key event Listenner
  useEffect(() => {
    const eventListner = handleKey(state, dispatchRoom, socket);

    window.addEventListener("keydown", eventListner, false);

    return () => {
      window.removeEventListener("keydown", eventListner, false);
    };
  });

  useEffect(() => {
    socket.on(eventSocket.START_GAME, () => {
      console.error("L'autre client a lance la partie");
      launchGame(dispatchRoom);
    });

    socket.on(eventSocket.NEXT_PIECE, newPiece => {
      console.log("On recupere la next piece", newPiece, state.listPieces);
      dispatchRoom(actionNextPiece(newPiece));
      //  setState({ ...state, listPieces: [...state.listPieces, newPiece] });
      console.log("Juste apres la next piece", newPiece, state.listPieces);
    });
  }, []);

  const isLog = true; //A definir dans les classes + state
  if (isLog) {
    return (
      <div className="app">
        <div className="app-board">
          <AppBoardInfo dispatchRoom={dispatchRoom} />
          <Game state={state} />
          <h1>{JSON.stringify(state.lose)}</h1>
        </div>

        <Spectrum className="app-spectrum" />
        <input type="text" onKeyPress={handleKey} />
      </div>
    );
  } else return <div />;
};

export default connect(mapStateToProps)(Room);
