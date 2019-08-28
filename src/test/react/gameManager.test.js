import React from "react";
import ReactDOM from "react-dom";
import {
  handleKey,
  launchGame,
  cleanListennerEndGame(state.eventListner, state.clearInterval, state.clearTimeout);,
  initializeListSpectrums,
  startGame,
  nextPiece,
  lineBreak
} from "../../client/components/Room/gameManager";
import _ from "lodash";
import eventSocket from "../../common/eventSocket";

const gridEmpty = [
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
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
];

describe("GAMEMANAGER.JS - startGame", () => {
  it("should return the initialized state", () => {
    const listPlayers = [];
    const listPieces = [
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
    ];
    const state = {
      grid: _.cloneDeep(gridEmpty),
      currentPiece: {}
    };
    const newCurrentPiece = listPieces[0];
    const newState = startGame(state, listPlayers, listPieces);
    expect(newState.grid).toEqual(gridEmpty);
    expect(newState.currentPiece.piece).toEqual(newCurrentPiece);
    expect(newState.listPieces).toEqual(listPieces);
  });
});

describe("GAMEMANAGER.JS - initializeListSpectrums", () => {
  it("should return the same state if player is alone", () => {
    const listPlayers = [];
    const state = {
      state: _.cloneDeep(gridEmpty)
    };
    expect(initializeListSpectrums(state, listPlayers)).toEqual(state);
  });

  it("should return the state with other player spectrum", () => {
    const listPlayers = ["player2"];
    const state = {
      grid: _.cloneDeep(gridEmpty)
    };
    const newState = {
      grid: _.cloneDeep(gridEmpty),
      listSpectrums: {
        player2: {
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
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
          ],
          score: 0,
          playerName: "player2"
        }
      }
    };
    expect(initializeListSpectrums(state, listPlayers)).toEqual(newState);
  });

  it("should return the state with other player spectrum", () => {
    const listPlayers = ["player2", "player3"];
    const state = {
      grid: _.cloneDeep(gridEmpty)
    };
    const newState = {
      grid: _.cloneDeep(gridEmpty),
      listSpectrums: {
        player2: {
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
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
          ],
          score: 0,
          playerName: "player2"
        },
        player3: {
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
            [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
          ],
          score: 0,
          playerName: "player3"
        }
      }
    };
    expect(initializeListSpectrums(state, listPlayers)).toEqual(newState);
  });
});

describe("GAMEMANAGER.JS - nextPiece", () => {
  const emit = (a, b, callback) => {
    callback();
  };
  it("should return the new piece at x = 5 and y = 0", () => {
    const listPieces = [
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
    ];

    const mockCallback = jest.fn();

    const state = {
      grid: _.cloneDeep(gridEmpty),
      currentPiece: {},
      listPieces: _.cloneDeep(listPieces),
      socket: {
        emit: mockCallback
      }
    };
    const newCurrentPiece = listPieces[0];
    const newState = nextPiece(state);
    expect(mockCallback).toHaveBeenCalledWith(
      eventSocket.NEXT_PIECE,
      state.grid
    );
    expect(newState.currentPiece.piece).toEqual(newCurrentPiece);
    expect(newState.currentPiece.x).toEqual(3);
    expect(newState.currentPiece.y).toEqual(0);
  });
});

describe("GAMEMANAGER.JS - lineBreak", () => {
  const gridWithLinesToBroke = [
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
    ["1", "2", "3", "4", "1", "5", "6", "7", "1", "4"]
  ];
  it("should return the state without the broken lines", () => {
    const mockCallback = jest.fn();
    const state = {
      grid: _.cloneDeep(gridWithLinesToBroke),
      socket: {
        emit: mockCallback
      }
    };
    const newState = lineBreak(state);
    expect(mockCallback).toHaveBeenCalledWith(eventSocket.LINE_BREAK, 1);
    expect(newState.grid).toEqual(gridEmpty);
  });
});

describe("GAMEMANAGER.JS - cleanListennerEndGame(state.eventListner, state.clearInterval, state.clearTimeout);", () => {
  it("should clear event listeners and interval", () => {
    const mockCallbackRemoveEventListener = jest.fn();
    const window = {
      addEventListener: mockCallbackRemoveEventListener
    };
    const state = {
      clearInterval: 42
    };
    jest.useFakeTimers();
    const newState = cleanListennerEndGame(state.eventListner, state.clearInterval, state.clearTimeout);(state);
    expect(newState.clearInterval).toEqual(-1);
  });
});
