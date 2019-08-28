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

describe("SERVER/GAME.JS", () => {
  const optionsGames = {
    invisibilityMode: true,
    spectrumMode: false
  };
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
  const interval = {
    intervallDownPiece: 10
  };
  it("should create the Game instance", () => {
    const game = new Game(players, optionsGames);
    expect(game.players).toEqual(players);
    expect(game.optionsGames.invisibility).toEqual(
      optionsGames.invisibilityMode
    );
    expect(game.optionsGames.spectrum).toEqual(optionsGames.spectrumMode);
    expect(game.intervallDownPiece).toEqual(10);
  });

  it("should return the player name if there is a winner", () => {
    const game = new Game(players, optionsGames);
    const winner = "player1";
    expect(game.checkWhoIsWinner()).toEqual(winner);
  });

  it("should return null if there is not a winner", () => {
    const game = new Game(players, optionsGames);
    game.players[1].lose = false;
    expect(game.checkWhoIsWinner()).toBeNull();
  });
});
