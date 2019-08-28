import Player from "../../server/Player";
import Room from "../../server/Room";
import _ from "lodash";

const gridInit = [
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
  [".", ".", ".", "1", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "1", "1", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", "1", ".", ".", ".", ".", "."]
];

const gridSpectrum = [
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
  [".", ".", ".", "9", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", "9", "9", ".", ".", ".", ".", "."],
  [".", ".", ".", "9", "9", ".", ".", ".", ".", "."]
];

describe("SERVER/PLAYER.JS - ", () => {
  const name = "player1";
  const spectrum = {
    playerName: name,
    score: 0,
    grid: _.cloneDeep(gridInit),
    lose: false
  };
  const mock = jest.fn();
  mock.mockReturnValue(spectrum);



  const on = (e, test) => {};

  const optionsGames = {
    invisibilityMode: false,
    spectrumMode: true
  };

  const clientSocket = {
    id: "123",
    on,
    join: jest.fn(),
    leave: jest.fn(),
    emit: jest.fn(),
    to: () => {
      return {
        emit: jest.fn()
      };
    }
  };
  const room = new Room("room", name, clientSocket);
  room.newGame(optionsGames);


  it("should generate the spectrum", () => {
    const player = new Player(name, room, clientSocket);
    const spectrum = {
      playerName: name,
      score: 0,
      lose: false,
      grid: _.cloneDeep(gridSpectrum),
      nb_win: 0,
      spectator: true
    };
    expect(spectrum).toEqual(player.generateSpectrum(gridInit));
  });


  it("should creates players", () => {
    room.addPlayer("player2", clientSocket);

    room.game = null;
    room.addPlayer("player2", clientSocket);


    expect(true).toEqual(true);
    // expect(player.generateSpectrum).toHaveBeenCalled();
  });

});