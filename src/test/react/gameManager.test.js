import React from "react";
import ReactDOM from "react-dom";
import {
  handleKey,
  launchGame,
  cleanListennerEndGame,
  initializeListSpectrums,
  startGame,
  nextPiece,
  lineBreak,
  winnerIs
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

    const optionGames = {
      invisibilityMode: false,
      spectrumMode: true
    };

    const state = {
      grid: _.cloneDeep(gridEmpty),
      currentPiece: {},
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
    const newCurrentPiece = listPieces[0];
    const newState = startGame(state, listPlayers, listPieces, optionGames);
    expect(newState.grid).toEqual(gridEmpty);
    expect(newState.currentPiece.piece).toEqual(newCurrentPiece);
    expect(newState.listPieces).toEqual(listPieces);
  });
});

describe("GAMEMANAGER.JS - initializeListSpectrums", () => {
  it("should return the same state if player is alone", () => {
    const listPlayers1 = ["player1"];
    const listPlayers2 = ["player2"];
    const state = {
      state: _.cloneDeep(gridEmpty),
      listSpectrums: {
        player1: {
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
    expect(initializeListSpectrums(state, listPlayers1)).toEqual(state);
    expect(initializeListSpectrums(state, listPlayers2)).toEqual(state);
  });

  /*   it("should return the state with other player spectrum", () => {
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
  }); */
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

describe("GAMEMANAGER.JS - cleanListennerEndGame", () => {
  it("should clear event listeners and interval", () => {
    const mockCallbackRemoveEventListener = jest.fn();
    const cleanInterval = 123;
    const cleanTimeout = 123;

    const window = {
      removeEventListener: mockCallbackRemoveEventListener
    };
    // jest.useFakeTimers();
    cleanListennerEndGame(() => {}, cleanInterval, cleanTimeout);
    //expect(mockCallbackRemoveEventListener).toHaveBeenCalled();
  });
});

describe("GAMEMANAGER.JS - winnerIs", () => {
  it("should increment the nbr of win by 1 if player is the winner", () => {
    const player = "player1";
    const state = {
      nb_win: 0,
      playerName: "player1"
    };
    winnerIs(state, player);
    expect(state.nb_win).toEqual(1);
  });

  it("should not increment the nbr of win by 1 if player is not the winner", () => {
    const player = "player2";
    const state = {
      nb_win: 0,
      playerName: "player1"
    };
    winnerIs(state, player);
    expect(state.nb_win).toEqual(0);
  });
});

describe("GAMEMANAGER.JS - launchGame", () => {
  it("should increment the nbr of win by 1 if player is the winner", () => {
    const dispatchRoom = jest.fn();
    const gameInterval = 1000;
    launchGame(dispatchRoom, gameInterval);
    expect(dispatchRoom).toHaveBeenCalled();
  });
});

describe("GAMEMANAGER.JS - handleKey", () => {
  it("should dispatch the right action given the keyCode", () => {
    const KEY_SPACE = 32;
    const KEY_DOWN = 40;
    const KEY_UP = 38;
    const KEY_LEFT = 37;
    const KEY_RIGHT = 39;
    const KEY_S = 83;
    const dispatchRoom = jest.fn();
    const event = {
      keyCode: 0,
      preventDefault: jest.fn()
    };
    event.keyCode = KEY_SPACE;
    handleKey(dispatchRoom)(event);
    expect(dispatchRoom).toHaveBeenCalled();
    event.keyCode = KEY_DOWN;
    handleKey(dispatchRoom)(event);
    expect(dispatchRoom).toHaveBeenCalled();
    event.keyCode = KEY_UP;
    handleKey(dispatchRoom)(event);
    expect(dispatchRoom).toHaveBeenCalled();
    event.keyCode = KEY_LEFT;
    handleKey(dispatchRoom)(event);
    expect(dispatchRoom).toHaveBeenCalled();
    event.keyCode = KEY_RIGHT;
    handleKey(dispatchRoom)(event);
    expect(dispatchRoom).toHaveBeenCalled();
    event.keyCode = KEY_S;
    handleKey(dispatchRoom)(event);
    expect(dispatchRoom).toHaveBeenCalled();
    event.keyCode = 0;
    handleKey(dispatchRoom)(event);
  });
});
