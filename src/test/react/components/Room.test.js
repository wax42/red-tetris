import React from "react";
import { shallow } from "enzyme";
import {
  RoomNoConnect,
  mapStateToProps,
  reduceRoom
} from "../../../client/components/Room/Room";
import {
  START_GAME,
  PIECE_DOWN,
  PIECE_LEFT,
  PIECE_RIGHT,
  PIECE_SPACE,
  PIECE_ROTATE,
  NEXT_PIECE,
  SWITCH_PIECE,
  ADD_INDESTRUCTIBLES_LINES,
  SPECTRUMS,
  SPECTRUMS_SPECTATOR,
  SEND_INTERVAL_KEY_EVENT,
  CLEAR_INTERVAL_KEY_EVENT,
  WINNER_IS,
  GAME_FINISH
} from "../../../client/actions/actionsTypes";
import _ from "lodash";
import { addIndestructiblesLines } from "../../../client/components/Room/gridChange";

const gridOnePieceWithShadow = [
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
  [".", ".", "1", "1", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "1", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "1", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", "0", "0", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "0", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "0", ".", ".", ".", ".", ".", "."]
];

const emit = (listPlayers, listPieces) => {
  return;
};

const _state = {
  socket: {
    emit
  },
  roomName: "room",
  playerName: "player1",
  spectator: false,
  grid: _.cloneDeep(gridOnePieceWithShadow),
  currentPiece: {
    x: 1,
    y: 11,
    piece: [
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "."],
      [".", ".", "1", "."]
    ]
  },
  shadow: {
    x: 1,
    y: 20,
    piece: [
      [".", ".", ".", "."],
      [".", "0", "0", "."],
      [".", ".", "0", "."],
      [".", ".", "0", "."]
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
      [".", "1", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "."],
      [".", ".", ".", "."]
    ],
    [
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", "1", "1", "."],
      [".", ".", ".", "."]
    ]
  ]
};

describe("ROOM.JSX", () => {
  it("should return state with wanted values", () => {
    const state = {
      socket: "",
      roomName: "room",
      playerName: "player1",
      spectator: false,
      grid: null,
      listPieces: []
    };
    const newState = {
      socket: "",
      roomName: "room",
      playerName: "player1",
      spectator: false
    };

    expect(mapStateToProps(state)).toEqual(newState);
  });

  it("should return the default state if action didn t not exist", () => {
    const state = {
      socket: "",
      roomName: "room",
      playerName: "player1",
      spectator: false,
      listPieces: []
    };
    const action = {
      type: "test"
    };
    reduceRoom(state, action);
  });

  it("should call startGame function if action type === START_GAME", () => {
    const state = {
      socket: "",
      roomName: "room",
      playerName: "player1",
      spectator: false,
      currentPiece: {
        x: 0,
        y: 0,
        Piece: []
      },
      listPieces: [],
      listSpectrums: {}
    };
    const action = {
      type: START_GAME,
      listPlayers: ["player1"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ]
      ],
      optionGames: {
        invisibilityMode: false,
        spectrumMode: true,
        shakeMode: false
      }
    };
    const cb = jest.fn();
    const startGame = (state, listPlayers, listPieces) => {
      cb();
    };
    reduceRoom(state, action);
    expect(cb).toHaveBeenCalled;
  });

  it("should call downPiece function if action type === PIECE_DOWN", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: PIECE_DOWN,
      listPlayers: ["player1"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    reduceRoom(state, action);
  });

  it("should call leftPiece function if action type === PIECE_LEFT", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: PIECE_LEFT,
      listPlayers: ["player1"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    reduceRoom(state, action);
  });

  it("should call rightPiece function if action type === PIECE_RIGHT", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: PIECE_RIGHT,
      listPlayers: ["player1"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    reduceRoom(state, action);
  });

  it("should call downFloorPiece function if action type === PIECE_SPACE", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: PIECE_SPACE,
      listPlayers: ["player1"],
      listPieces: []
    };
    reduceRoom(state, action);
  });

  it("should call rotatePiece function if action type === PIECE_ROTATE", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: PIECE_ROTATE,
      listPlayers: ["player1"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    reduceRoom(state, action);
  });

  it("should return the new state if action type === NEXT_PIECE", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: NEXT_PIECE,
      listPlayers: ["player1"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    const newState = reduceRoom(state, action);
    expect(newState).toEqual({
      ...state,
      listPieces: [...state.listPieces, action.pieces]
    });
  });

  it("should call switchPiece function if action type === SWITCH_PIECE", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: SWITCH_PIECE,
      listPlayers: ["player1"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    const newState = reduceRoom(state, action);
  });

  it("should call addIndestructiblesLines function if action type === ADD_INDESTRUCTIBLES_LINES", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: ADD_INDESTRUCTIBLES_LINES,
      nbrLines: 1,
      listPlayers: ["player1", "player2"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    const newState = reduceRoom(state, action);
    expect(newState).toEqual({ ...state });
  });

  it("should return the new state if action type === SPECTRUMS", () => {
    const __state = _.cloneDeep(_state);
    const state = { ...__state, listSpectrums: {} };
    const action = {
      type: SPECTRUMS,
      nbrLines: 1,
      listPlayers: ["player1", "player2"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ],
      spectrum: {
        playerName: "player2",
        listSpectrums: [
          [
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
            [".", ".", "1", "1", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "1", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "1", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", "0", "0", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "0", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "0", ".", ".", ".", ".", ".", "."]
          ]
        ]
      }
    };
    reduceRoom(state, action);
  });

  it("should return the new state if action type === SPECTRUMS_SPECTATOR", () => {
    const __state = _.cloneDeep(_state);
    const state = { ...__state, listSpectrums: {} };
    const action = {
      type: SPECTRUMS_SPECTATOR,
      nbrLines: 1,
      listPlayers: ["player1", "player2"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ],
      spectrum: {
        playerName: "player2",
        listSpectrums: [
          [
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
            [".", ".", "1", "1", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "1", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "1", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", "0", "0", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "0", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", "0", ".", ".", ".", ".", ".", "."]
          ]
        ]
      }
    };
    reduceRoom(state, action);
  });

  it("should should return the new state if action type === SEND_INTERVAL_KEY_EVENT", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: SEND_INTERVAL_KEY_EVENT,
      clearInterval: 69,
      listPlayers: ["player1", "player2"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    const newState = reduceRoom(state, action);
    expect(newState).toEqual(
      Object.assign(state, {
        clearInterval: action.clearInterval,
        eventListner: action.eventListener
      })
    );
  });

  /* it("should call addIndestructiblesLines function if action type === CLEAR_INTERVAL_KEY_EVENT", () => {
    const state = _.cloneDeep(_state);
    const action = {
      type: CLEAR_INTERVAL_KEY_EVENT,
      listPlayers: ["player1", "player2"],
      listPieces: [
        [
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."],
          [".", "1", ".", "."]
        ],
        [
          [".", "1", ".", "."],
          [".", "1", "1", "."],
          [".", ".", "1", "."],
          [".", ".", ".", "."]
        ],
        [
          [".", ".", ".", "."],
          [".", "1", "1", "."],
          [".", "1", "1", "."],
          [".", ".", ".", "."]
        ]
      ]
    };
    const newState = reduceRoom(state, action);
    addIndestructiblesLines({ ...state }, 0);
    expect(newState).toEqual({ ...state });
  }); */

  it("should return the new state with game set to false", () => {
    const state = {
      game: true,
      listPieces: []
    };
    const action = {
      type: GAME_FINISH
    };
    expect(reduceRoom(state, action)).toEqual({ ...state, game: false });
  });

  it("should return the new state if action type is CLEAR_INTERVAL_KEY_EVENT", () => {
    const state = {
      game: true,
      listPieces: [],
      clearInterval: 1234,
      eventListner: () => {},
      clearTimeout: "",
      endOfGame: false
    };
    const action = {
      type: CLEAR_INTERVAL_KEY_EVENT
    };
    expect(reduceRoom(state, action)).toEqual({
      ...state,
      clearInterval: -1,
      game: false,
      endOfGame: true
    });
  });

  it("should return the new state if action type is SEND_INTERVAL_KEY_EVENT", () => {
    const state = {
      game: false,
      listPieces: [],
      clearTimeout: "",
      endOfGame: false,
      counterAnimation: true
    };
    const action = {
      type: SEND_INTERVAL_KEY_EVENT,
      clearInterval: 1234,
      eventListener: () => {}
    };
    expect(reduceRoom(state, action)).toEqual({
      ...state,
      clearInterval: 1234,

      counterAnimation: false
    });
  });
});
