import {
  START_GAME,
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE
} from "../actions/actionTypes";

import { downPiece, leftPiece, rightPiece, rotatePiece } from "./gridChange";
import _ from "lodash";

const initialState = {
  grid: [
    [".", "1", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "1", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "1", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", "1", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "1", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "1", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "1", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", "1", ".", ".", ".", ".", "."],
    [".", ".", ".", "2", "2", "2", "2", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
  ],
  currentPiece: {
    x: 0,
    y: 0,
    piece: [
      [".", "1", "1", "1"],
      [".", ".", ".", "1"],
      [".", ".", ".", "."],
      [".", ".", ".", "."]
    ]
  },
  shadow: {
    x: 0,
    y: 0,
    piece: [
      [".", "1", "1", "1"],
      [".", ".", ".", "1"],
      [".", ".", ".", "."],
      [".", ".", ".", "."]
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
  name: "toto"
};

const reducers = (state = initialState, action) => {
  console.log("Grid:", state.grid);
  console.log(`Action: ${action}`);
  // let new_state = Object.assign({}, state)
  let new_state = _.cloneDeep(state);
  switch (action.type) {
    case START_GAME:
      //Modifier le state
      return state;
    case PIECE_DOWN:
      console.log("Down");
      new_state = downPiece(new_state);
      return new_state;
    case PIECE_LEFT:
      console.log("Left");
      new_state = leftPiece(new_state);
      return new_state;
    case PIECE_RIGHT:
      console.log("Right");
      new_state = rightPiece(new_state);
      return new_state;
    case PIECE_SPACE:
      console.log("Space");
      return state;
    case PIECE_ROTATE:
      console.log("Rotate");
      if ((new_state = rotatePiece(new_state))) {
        return new_state;
      }
      break;
    default:
      return state;
  }
  return state;
};

export default reducers;
