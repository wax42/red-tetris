import React, { useEffect, useReducer, useRef } from "react";
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
  SEND_INTERVAL_KEY_EVENT,
  WINNER_IS,
  CLEAR_INTERVAL_KEY_EVENT
} from "../../actions/actionsTypes";
import { launchGame, startGame, cleanListennerEndGame } from "./gameManager";

import {
  rotatePiece,
  downFloorPiece,
  downPiece,
  leftPiece,
  rightPiece,
  switchPiece,
  addIndestructiblesLines
} from "./gridChange";

import { GRID, EMPTY_PIECE } from "../../../common/common";
import eventSocket from "../../../common/eventSocket";

import {
  actionNextPiece,
  actionIndestructiblesLines,
  actionSpectrum,
  actionStartGame,
  actionSpectrumsSpectator,
  actionWinnerIs,
  actionClearIntervalKeyEvent
} from "../../actions/actionsRoom";

import ERROR from "../../../common/error";

import { actionCleanRoomName, actionIsSpectator, actionError } from "../../actions/actionsRedux";
import Button from "@material-ui/core/Button";
import _ from "lodash";

export const mapStateToProps = state => {
  return {
    socket: state.socket,
    roomName: state.roomName,
    playerName: state.playerName,
    spectator: state.spectator
  };
};

const leaveRoom = (state, dispatch) => {
  dispatch(actionCleanRoomName());
  state.socket.emit(eventSocket.LEAVE_ROOM);
  window.location.hash = "";
};

export const reduceRoom = (state, action) => {
  // if (state.socket.disconnected === true) {
  //   console.error("Warning connection lost");
  // }

  switch (action.type) {
    case START_GAME:
      return startGame(
        { ...state, game: true, endOfGame: false, winner: null },
        action.listPlayers,
        action.listPieces,
        action.optionGames
      );
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
      return addIndestructiblesLines({ ...state }, action.nbrLines);
    case SPECTRUMS:
      let newState = { ...state };
      newState.listSpectrums[action.spectrum.playerName] = action.spectrum;
      return newState;
    case SPECTRUMS_SPECTATOR:
      return { ...state, listSpectrums: action.listSpectrums };

    case SEND_INTERVAL_KEY_EVENT:
      return {
        ...state,
        clearInterval: action.clearInterval,
        eventListner: action.eventListner,
        counterAnimation: false
      };

    case WINNER_IS:
      return {
        ...state,
        winner: action.winner,
        counterAnimation: false
      };
    case CLEAR_INTERVAL_KEY_EVENT:
      cleanListennerEndGame(state.eventListner, state.clearInterval);
      return { ...state, clearInterval: -1, game: false, endOfGame: true };

    default:
      return state;
  }
};

export const RoomNoConnect = ({ socket, roomName, playerName, spectator }) => {
  const dispatch = useDispatch();
  const initialState = {
    socket: socket,
    playerName: playerName,
    grid: GRID,
    currentPiece: {
      x: 3,
      y: 0,
      piece: EMPTY_PIECE
    },
    shadow: {
      x: 3,
      y: 0,
      piece: EMPTY_PIECE
    },
    listPieces: [EMPTY_PIECE, EMPTY_PIECE, EMPTY_PIECE],
    listSpectrums: {},
    admin: false,
    lose: false,
    winner: null,
    score: 0,
    clearInterval: -1,
    eventListner: null,
    gameInterval: 1000,
    brokenLines: [],
    key: 0,
    game: false,
    counterAnimation: false,
    endOfGame: false,
    shakeMode: false
  };

  const [state, dispatchRoom] = useReducer(reduceRoom, initialState);

  useEffect(() => {
    if (spectator === true && _.isEmpty(state.listSpectrums)) {
      socket.emit(eventSocket.SEND_SPECTRUMS_SPECTATOR, listSpectrums => {
        dispatchRoom(actionSpectrumsSpectator(listSpectrums));
      });
    }
  });
  const countRef = useRef(state.winner);
  countRef.current = state.winner;

  useEffect(() => {
    socket.on(eventSocket.START_GAME, (listPlayers, listPieces, optionGames) => {
      if (spectator === true) {
        dispatch(actionIsSpectator());
      }
      listPlayers = listPlayers.filter(value => value !== playerName);
      dispatchRoom(actionStartGame(listPlayers, listPieces, optionGames));
      setTimeout(() => {
        if (countRef.current !== playerName) {
          launchGame(dispatchRoom, optionGames.gameInterval);
        }
      }, 4000);
    });

    socket.on(eventSocket.NEXT_PIECE, newPiece => {
      dispatchRoom(actionNextPiece(newPiece));
    });

    socket.on(eventSocket.LINE_BREAK, nbrLines => {
      if (spectator !== true) {
        dispatchRoom(actionIndestructiblesLines(nbrLines));
      }
    });

    socket.on(eventSocket.SEND_SPECTRUMS, spectrum => {
      dispatchRoom(actionSpectrum(spectrum));
    });

    socket.on(eventSocket.WINNER_IS, winner => {
      dispatchRoom(actionWinnerIs(winner));
      dispatchRoom(actionClearIntervalKeyEvent());
    });
    socket.on(eventSocket.DISCONNECT, () => {
      dispatch(actionError(ERROR.SERVER_DOWN));
    });
    return () => {
      cleanListennerEndGame(state.eventListner, state.clearInterval);
      socket.removeListener(eventSocket.START_GAME);
      socket.removeListener(eventSocket.NEXT_PIECE);
      socket.removeListener(eventSocket.LINE_BREAK);
      socket.removeListener(eventSocket.SEND_SPECTRUMS);
      socket.removeListener(eventSocket.WINNER_IS);
    };
  }, [socket, playerName, spectator, dispatch, state.eventListner, state.clearInterval, state.endOfGame]);

  const counter =
    state.counterAnimation === false ? null : (
      <div className={"countdown"}>
        <div className={"number"}>
          <h2>03</h2>
        </div>
        <div className={"number"}>
          <h2>02</h2>
        </div>
        <div className={"number"}>
          <h2>01</h2>
        </div>
        <div className={"number"}>
          <h2>GO!</h2>
        </div>
      </div>
    );

  let winner = null;
  if (!spectator && state.endOfGame && !state.lose) {
    winner = (
      <div className="winner">
        <span className="text1">You win</span>
        <span className="text2">You're the red tetris Master</span>
      </div>
    );
  } else if (state.endOfGame && state.lose) {
    winner = (
      <div className="loser">
        <span className="text1">You lose</span>
        <span className="text2">The battle but not the war</span>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app-board">
        {counter}
        {winner}
        <Button color="primary" onClick={() => leaveRoom(state, dispatch)}>
          Leave Room
        </Button>
        <AppBoardInfo state={state} />
        <Game state={state} />
        {state.score}
        <h1 style={{ color: "pink" }}>{JSON.stringify(state.lose)}</h1>
      </div>
      <Spectrum listSpectrums={state.listSpectrums} className="app-spectrum" />
    </div>
  );
};

const Room = connect(mapStateToProps)(RoomNoConnect);
export default Room;
