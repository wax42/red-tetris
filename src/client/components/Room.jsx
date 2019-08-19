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
  SEND_INTERVAL_KEY_EVENT,
  WINNER_IS,
  CLEAR_INTERVAL_KEY_EVENT
} from "../actions/actionTypes";
import {
  launchGame,
  startGame,
  handleKey,
  cleanListennerEndGame
} from "../gameManager";

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
  actionSpectrumsSpectator,
  actionWinnerIs,
  actionClearIntervalKeyEvent
} from "../actions/actionRoom";

import { actionCleanRoomName } from "../actions/actions";

import _ from "lodash";

export const mapStateToProps = state => {
  return {
    socket: state.socket,
    roomName: state.roomName,
    playerName: state.playerName,
    spectator: state.spectator
  };
};

// const leaveRoom = (state, dispatch) => {
//   dispatch(actionCleanRoomName());
//   state.socket.emit(eventSocket.LEAVE_ROOM);
//   window.location.hash = "";
// };

export const reduceRoom = (state, action) => {
  // console.log("REDUCE ROOM", action.type, state.winner, action, state);
  state.brokenLines = [];
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
        eventListner: action.eventListner
      };

    case WINNER_IS:
      return {
        ...state,
        winner: action.winner
      };
    case CLEAR_INTERVAL_KEY_EVENT:
      return cleanListennerEndGame({ ...state });
    default:
      return state;
  }
};

export const RoomNoConnect = ({ socket, roomName, playerName, spectator }) => {
  const dispatch = useDispatch();
  const initialState = {
    socket: socket,
    playerName: playerName,
    clearInterval: -1,
    eventListner: null,
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
    brokenLines: [] // List of posiiton of broken lines to apply animation
  };
  const [state, dispatchRoom] = useReducer(reduceRoom, initialState);
  // Key event Listenner
  useEffect(() => {
    // console.log("JE MOUNT");
  }, []);
  useEffect(() => {
    if (spectator === true && _.isEmpty(state.listSpectrums)) {
      socket.emit(eventSocket.SEND_SPECTRUMS_SPECTATOR, listSpectrums => {
        dispatchRoom(actionSpectrumsSpectator(listSpectrums));
      });
    }
  });

  useEffect(() => {
    socket.on(eventSocket.START_GAME, (listPlayers, listPieces) => {
      listPlayers = listPlayers.filter(value => value !== playerName);
      dispatchRoom(actionStartGame(listPlayers, listPieces));
      launchGame(dispatchRoom);
    });

    socket.on(eventSocket.NEXT_PIECE, newPiece => {
      // console.log("Je recois next_piece du server : ", newPiece);
      dispatchRoom(actionNextPiece(newPiece));
    });

    socket.on(eventSocket.LINE_BREAK, nbrLines => {
      dispatchRoom(actionIndestructiblesLines(nbrLines));
    });

    socket.on(eventSocket.SEND_SPECTRUMS, spectrum => {
      dispatchRoom(actionSpectrum(spectrum));
    });

    socket.on(eventSocket.WINNER_IS, winner => {
      console.log("WINNER IS");
      dispatchRoom(actionWinnerIs(winner));
      dispatchRoom(actionClearIntervalKeyEvent());
      // dispatch room
    });
    return () => {
      // console.log("UNMOUNT COMPONENT");
      socket.removeListener(eventSocket.START_GAME);
      socket.removeListener(eventSocket.NEXT_PIECE);
      socket.removeListener(eventSocket.LINE_BREAK);
      socket.removeListener(eventSocket.SEND_SPECTRUMS);
      socket.removeListener(eventSocket.WINNER_IS);
    };
  }, [socket, playerName, spectator]);

  const isLog = true; //A definir dans les classes + state
  if (isLog) {
    return (
      <div className="app">
        <div className="app-board">
          {/* <button onClick={() => leaveRoom(state, dispatch)}>Play</button> */}
          <AppBoardInfo state={state} dispatchRoom={dispatchRoom} />
          <Game state={state} />
          <h1 style={{ color: "pink" }}>{JSON.stringify(state.lose)}</h1>
        </div>

        <Spectrum
          listSpectrums={state.listSpectrums}
          className="app-spectrum"
        />
        {/* <input type="text" onKeyPress={handleKey} /> */}
      </div>
    );
  } else return <div />;
};

const Room = connect(mapStateToProps)(RoomNoConnect);
export default Room;
