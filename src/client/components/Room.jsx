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
  NEXT_PIECE,
  SWITCH_PIECE,
  ADD_INDESTRUCTIBLES_LINES,
  SPECTRUMS,
  START_GAME,
  SPECTRUMS_SPECTATOR,
  CLEAR_LOSE
} from "../actions/actionTypes";
import { launchGame, startGame, handleKey } from "../gameManager";

import {
  rotatePiece,
  downFloorPiece,
  downPiece,
  leftPiece,
  rightPiece,
  switchPiece,
  addIndestructiblesLines
} from "../gridChange";

import { GRID, EMPTY_PIECE } from "../../common/common";
import eventSocket from "../../common/eventSocket";

import {
  actionNextPiece,
  actionIndestructiblesLines,
  actionSpectrum,
  actionStartGame,
  actionSpectrumsSpectator
} from "../actions/actionRoom";

import _ from "lodash";

const mapStateToProps = state => {
  return {
    socket: state.socket,
    roomName: state.roomName,
    playerName: state.playerName,
    spectator: state.spectator
  };
};

const reduceRoom = (state, action) => {
  console.log("reduce rooom", action, state);
  switch (action.type) {
    case START_GAME:
      return startGame({ ...state }, action.listPlayers, action.listPieces);
    case PIECE_DOWN:
      return downPiece({ ...state });
    case PIECE_LEFT:
      return leftPiece({ ...state });
    case PIECE_RIGHT:
      return rightPiece({ ...state });
    case PIECE_SPACE:
      return downFloorPiece({ ...state });
    case PIECE_ROTATE:
      let nState = rotatePiece({ ...state });
      if (nState === null) return state;
      return nState;
    case NEXT_PIECE:
      return { ...state, listPieces: [...state.listPieces, action.piece] };
    case SWITCH_PIECE:
      return switchPiece({ ...state });
    case ADD_INDESTRUCTIBLES_LINES:
      console.log("REDUCERROOM add_ind", action.nbrLines);
      return addIndestructiblesLines({ ...state }, action.nbrLines);
    case SPECTRUMS:
      let newState = { ...state };
      newState.listSpectrums[action.spectrum.playerName] = action.spectrum;
      return newState;
    case SPECTRUMS_SPECTATOR:
      console.log("reduce rooom spectrums spectator");
      return { ...state, listSpectrums: action.listSpectrums };

    case CLEAR_LOSE:
      return {
        ...state,
        clearInterval: action.clearInterval,
        eventListner: action.eventListner
      };

    default:
      return state;
  }
  return state;
};

const Room = ({ socket, roomName, playerName, spectator }) => {
  const dispatch = useDispatch();

  const initialState = {
    socket: socket,
    playerName: playerName,
    clearInterval: -1,
    eventListner: null,
    grid: GRID,
    currentPiece: {
      x: 5,
      y: 0,
      piece: EMPTY_PIECE
    },
    shadow: {
      x: 5,
      y: 0,
      piece: EMPTY_PIECE
    },
    listPieces: [EMPTY_PIECE, EMPTY_PIECE, EMPTY_PIECE],
    listSpectrums: {},
    admin: false,
    lose: false
  };
  const [state, dispatchRoom] = useReducer(reduceRoom, initialState);

  // Key event Listenner
  useEffect(() => {
    console.log("reMounted");
    console.log("START GAME updated", JSON.stringify(GRID));

    if (spectator === true && _.isEmpty(state.listSpectrums)) {
      socket.emit(eventSocket.SEND_SPECTRUMS_SPECTATOR, listSpectrums => {
        console.log("SPECTATOR ASK SPECTRUM", listSpectrums);
        dispatchRoom(actionSpectrumsSpectator(listSpectrums));
      });
    }
  });

  useEffect(() => {
    socket.on(eventSocket.START_GAME, (listPlayers, listPieces) => {
      listPlayers = listPlayers.filter(value => value !== playerName);
      dispatchRoom(actionStartGame(listPlayers, listPieces));

      console.error("L'autre client a lance la partie");
      launchGame(state, dispatchRoom);
    });

    socket.on(eventSocket.NEXT_PIECE, newPiece => {
      console.log("On recupere la next piece", newPiece, state.listPieces);
      dispatchRoom(actionNextPiece(newPiece));
      //  setState({ ...state, listPieces: [...state.listPieces, newPiece] });
      console.log("Juste apres la next piece", newPiece, state.listPieces);
    });

    socket.on(eventSocket.LINE_BREAK, nbrLines => {
      console.log("Another Client on Line Break", nbrLines);
      dispatchRoom(actionIndestructiblesLines(nbrLines));
    });

    socket.on(eventSocket.SEND_SPECTRUMS, spectrum => {
      dispatchRoom(actionSpectrum(spectrum));
    });
  }, []);

  console.log("Componenets rooom mounted", state);

  const isLog = true; //A definir dans les classes + state
  if (isLog) {
    return (
      <div className="app">
        <div className="app-board">
          <AppBoardInfo state={state} dispatchRoom={dispatchRoom} />
          <Game state={state} />
          <h1>{JSON.stringify(state.lose)}</h1>
        </div>

        <Spectrum
          listSpectrums={state.listSpectrums}
          className="app-spectrum"
        />
        <input type="text" onKeyPress={handleKey} />
      </div>
    );
  } else return <div />;
};

export default connect(mapStateToProps)(Room);
