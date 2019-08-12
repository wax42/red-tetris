import Game from "../../server/Game";
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

describe("GAME.JS", () => {
  const players = [
    {
      score: 0,
      name: "player1",
      room: {},
      roomName: "room1",
      id: "123",
      socket: "345",
      grid: _.cloneDeep(gridEmpty),
      lose: false
    },
    {
      score: 0,
      name: "player2",
      room: {},
      roomName: "room1",
      id: "123",
      socket: "345",
      grid: _.cloneDeep(gridEmpty),
      lose: true
    }
  ];
  it("should create the Game instance", () => {
    const game = new Game(players);
    expect(game.players).toEqual(players);
    // expect(game.optionsGames.invisibility).toEqual(false);
  });

  it("should return the player name if there is a winner", () => {
    const game = new Game(players);
    const winner = "player1";
    expect(game.checkWhoIsWinner()).toEqual(winner);
  });

  it("should return null if there is not a winner", () => {
    const game = new Game(players);
    game.players[1].lose = false;
    expect(game.checkWhoIsWinner()).toBeNull();
  });
});
