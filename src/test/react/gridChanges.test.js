import React from "react";
import ReactDOM from "react-dom";
import {
  rotate,
  cleanOldPiece,
  placePiece,
  calculateSpaceUp,
  calculateSpaceDown,
  calculateSpaceLeft,
  calculateSpaceRight,
  checkIsPos,
  placeShadow,
  positionShadow,
  checkIslose,
  downFloorPiece
} from "../../client/gridChange";
import _ from "lodash";

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

const gridOnePiece = [
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
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]
];

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

const gridOnePieceWithShadowSolo = [
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
  [".", ".", "0", "0", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "0", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "0", ".", ".", ".", ".", ".", "."]
];

const gridLose = [
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "1"],
  [".", ".", ".", ".", ".", ".", ".", ".", "1", "1"],
  [".", ".", ".", ".", ".", ".", ".", ".", "1", "."],
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

describe("GRIDCHANGES.JS - Rotate", () => {
  it("should return the same matrix if matrix is empty", () => {
    const matrix = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", ".", ".", "."]
    ];
    expect(rotate(matrix)).toEqual(matrix);
  });

  it("should return the transposition of the matrix (simple bar)", () => {
    const matrix = [
      [".", ".", "1", "."],
      [".", ".", "1", "."],
      [".", ".", "1", "."],
      [".", ".", "1", "."]
    ];
    const matrixTranspose = [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      ["1", "1", "1", "1"],
      [".", ".", ".", "."]
    ];
    expect(rotate(matrix)).toEqual(matrixTranspose);
  });

  it("should return the transposition of the matrix (z tetri)", () => {
    const matrix = [
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "1"],
      [".", ".", ".", "."]
    ];
    const matrixTranspose = [
      [".", ".", ".", "."],
      [".", ".", "1", "."],
      [".", "1", "1", "."],
      [".", "1", ".", "."]
    ];
    expect(rotate(matrix)).toEqual(matrixTranspose);
  });
});

describe("GRIDCHANGES.JS - cleanOldPiece", () => {
  it("should clean the current piece in the grid", () => {
    const currentPiece = {
      x: 1,
      y: 11,
      piece: [
        [".", ".", ".", "."],
        [".", "1", "1", "."],
        [".", ".", "1", "."],
        [".", ".", "1", "."]
      ]
    };
    expect(cleanOldPiece(_.cloneDeep(gridOnePiece), currentPiece)).toEqual(
      gridEmpty
    );
  });
});

describe("GRIDCHANGES.JS - placePiece", () => {
  it("should return the grid with the piece", () => {
    const currentPiece = {
      x: 1,
      y: 11,
      piece: [
        [".", ".", ".", "."],
        [".", "1", "1", "."],
        [".", ".", "1", "."],
        [".", ".", "1", "."]
      ]
    };
    expect(placePiece(_.cloneDeep(gridEmpty), currentPiece)).toEqual(
      gridOnePiece
    );
  });
});

describe("GRIDCHANGES.JS - calculateSpace", () => {
  const currentPiece1 = {
    piece: [
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "."],
      [".", ".", "1", "."]
    ]
  };

  const currentPiece2 = {
    piece: [
      [".", ".", ".", "."],
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "1"]
    ]
  };

  it("should calculate the space up of currentPiece1", () => {
    expect(calculateSpaceUp(currentPiece1)).toEqual(1);
  });
  it("should calculate the space up of currentPiece2", () => {
    expect(calculateSpaceUp(currentPiece2)).toEqual(2);
  });

  it("should calculate the space down of currentPiece1", () => {
    expect(calculateSpaceDown(currentPiece1)).toEqual(0);
  });
  it("should calculate the space down of currentPiece2", () => {
    expect(calculateSpaceDown(currentPiece2)).toEqual(0);
  });

  it("should calculate the space left of currentPiece1", () => {
    expect(calculateSpaceLeft(currentPiece1)).toEqual(1);
  });
  it("should calculate the space left of currentPiece2", () => {
    expect(calculateSpaceLeft(currentPiece2)).toEqual(1);
  });

  it("should calculate the space right of currentPiece1", () => {
    expect(calculateSpaceRight(currentPiece1)).toEqual(1);
  });
  it("should calculate the space right of currentPiece2", () => {
    expect(calculateSpaceRight(currentPiece2)).toEqual(0);
  });
});

describe("GRIDCHANGES.JS - CheckIsPos", () => {
  const currentPiece1 = {
    x: -2,
    y: 7,
    piece: [
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "."],
      [".", ".", "1", "."]
    ]
  };

  const currentPiece2 = {
    x: 1,
    y: 10,
    piece: [
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "."],
      [".", ".", "1", "."]
    ]
  };
  const currentPiece3 = {
    x: 6,
    y: 3,
    piece: [
      [".", ".", ".", "."],
      [".", "1", "1", "."],
      [".", ".", "1", "."],
      [".", ".", "1", "."]
    ]
  };
  it("should return false if is out of the map", () => {
    expect(checkIsPos(gridOnePiece, currentPiece1)).toEqual(false);
  });
  it("should return false if is not posable in the map", () => {
    expect(checkIsPos(gridOnePiece, currentPiece2)).toEqual(false);
  });

  it("should return true if is posable in the map", () => {
    expect(checkIsPos(gridOnePiece, currentPiece3)).toEqual(true);
  });
});

describe("GRIDCHANGES.JS - placeShadow", () => {
  it("should return the grid with the shadow well placed", () => {
    const shadow = {
      x: 1,
      y: 20,
      piece: [
        [".", ".", ".", "."],
        [".", "0", "0", "."],
        [".", ".", "0", "."],
        [".", ".", "0", "."]
      ]
    };
    expect(placeShadow(gridOnePiece, shadow)).toEqual(gridOnePieceWithShadow);
  });
});

describe("GRIDCHANGES.JS - positionShadow", () => {
  const state = {
    grid: _.cloneDeep(gridEmpty),
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
      x: 0,
      y: 0,
      piece: [
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."],
        [".", ".", ".", "."]
      ]
    }
  };
  it("should return the state with the updated shadow", () => {
    const newState = positionShadow(state);
    expect(newState.grid).toEqual(gridOnePieceWithShadowSolo);
  });
});

describe("GRIDCHANGES.JS - checkIsLose", () => {
  it("should return true if the heap is reach", () => {
    const state = {
      grid: _.cloneDeep(gridLose)
    };
    expect(checkIslose(state)).toEqual(true);
  });
  it("should return false if the heap is not reach", () => {
    const state = {
      grid: _.cloneDeep(gridOnePiece)
    };
    expect(checkIslose(state)).toEqual(false);
  });
});

/* describe("GRIDCHANGES.JS - downFloorPiece", () => {
  it("should return true if the heap is reach", () => {
    const state = {
      grid: _.cloneDeep(gridLose)
    };
    expect(checkIslose(state)).toEqual(true);
  });
}); */

describe("GRIDCHANGES.JS - downFloorPiece", () => {
  it("should return true if the heap is reach", () => {
    const state = {
      grid: _.cloneDeep(gridLose)
    };
    expect(checkIslose(state)).toEqual(true);
  });
});
