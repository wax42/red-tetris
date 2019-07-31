import {
  START_GAME,
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE,
  CREATE_ROOM
} from "../actions/actionTypes";

import {
  downPiece,
  leftPiece,
  rightPiece,
  rotatePiece,
  downFloorPiece
} from "./gridChange";

import { startGame } from "./gameManager";

import _ from "lodash";

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
  timeId: null,
  name: "toto"
};

function DownPieceWithSecret() {
  return dispatch => {};
}

const reducers = (state = initialState, action) => {
  console.log("Grid:", state.grid);
  // console.log(`Action: ${action}`);
  // let newState = Object.assign({}, state)

  let newState = _.cloneDeep(state);
  switch (action.type) {
    case CREATE_ROOM:
      console.log(
        "JE VIENS DE RAFRACIHIE TOUTE L APPLCIATION DE LA CHATTE A TA MERTE"
      );

      return { ...state, room: action.room, player: action.player };
    case START_GAME:
      //Modifier le state
      console.log("CLICK START GAME");
      newState = startGame(newState);
      return newState;
    case PIECE_DOWN:
      newState = downPiece(newState);
      console.log("Down");
      return newState;
    case PIECE_LEFT:
      console.log("Left");
      newState = leftPiece(newState);
      return newState;
    case PIECE_RIGHT:
      console.log("Right");
      newState = rightPiece(newState);
      return newState;
    case PIECE_SPACE:
      console.log("Space");
      newState = downFloorPiece(newState);
      return newState;
    case PIECE_ROTATE:
      console.log("Rotate");
      if ((newState = rotatePiece(newState))) {
        return newState;
      }
      break;
    default:
      return state;
  }
  return state;
};

export default reducers;
