import Room from "../../server/Room";
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

const name = "room";
const playerName = "player1";
const clientSocket = {
  id: "123",
  on: jest.fn(),
  join: jest.fn(),
  emit: jest.fn(),
  to: () => {
    return {
      emit: jest.fn()
    };
  }
};

describe("SERVER/ROOM.JS", () => {
  it("should create a Room instance", () => {
    const room = new Room(name, playerName, clientSocket);
    const res = {
      name,
      admin: clientSocket.id,
      game: null,
      players: [
        {
          score: 0,
          name: "player1",
          room: room,
          roomName: "room",
          id: "123",
          socket: {
            id: "123",
            on: jest.fn(),
            join: jest.fn(),
            emit: jest.fn()
          },
          grid: _.cloneDeep(gridEmpty),
          lose: false
        }
      ]
    };
    expect(room.name).toEqual(res.name);
    expect(room.playerName).toEqual(res.playerName);
    expect(room.admin).toEqual(res.admin);
    // expect(room.players).toEqual(res.players);
  });

  it("should create a instance of Game", () => {
    const optionsGames = {
      invisibilityMode: false,
      spectrumMode: true
    };
    const players = [
      {
        score: 0,
        name: "player1",
        room: {},
        roomName: "room",
        id: "123",
        socket: {
          id: "123",
          on: jest.fn(),
          join: jest.fn()
        },
        grid: _.cloneDeep(gridEmpty),
        lose: false
      },
      {
        score: 0,
        name: "player2",
        room: {},
        roomName: "room",
        id: "456",
        socket: {
          id: "456",
          on: jest.fn(),
          join: jest.fn()
        },
        grid: _.cloneDeep(gridEmpty),
        lose: true
      }
    ];
    const room = new Room(name, playerName, clientSocket);
    room.players = _.cloneDeep(players);
    room.newGame(optionsGames);
    expect(room.game.players.length).toEqual(2);
    expect(room.game.players).toEqual(players);
  });

  it("should delete a player to players room", () => {
    const optionsGames = {
      invisibilityMode: false,
      spectrumMode: true
    };
    const players = [
      {
        score: 0,
        name: "player1",
        room: {},
        roomName: "room",
        id: "123",
        socket: {
          id: "123",
          on: jest.fn(),
          join: jest.fn(),
          leave: jest.fn(),
          emit: jest.fn(),
          removeAllListeners: jest.fn()
        },
        grid: _.cloneDeep(gridEmpty),
        lose: false
      },
      {
        score: 0,
        name: "player2",
        room: {},
        roomName: "room",
        id: "456",
        socket: {
          id: "456",
          on: jest.fn(),
          join: jest.fn(),
          leave: jest.fn(),
          emit: jest.fn(),
          removeAllListeners: jest.fn()
        },
        grid: _.cloneDeep(gridEmpty),
        lose: true
      }
    ];
    const room1 = new Room(name, playerName, clientSocket);
    room1.players = _.cloneDeep(players);
    room1.game = new Game([...players], optionsGames);

    expect(room1.players.length).toEqual(2);
    room1.deletePlayer(players[0].socket);
    expect(room1.players.length).toEqual(1);
    room1.deletePlayer(players[1].socket);
    expect(room1.players.length).toEqual(0);
    room1.deletePlayer(players[0].socket);
    expect(room1.deletePlayer(players[0].socket)).toBeFalsy();

    const room2 = new Room(name, playerName, clientSocket);
    room2.players = _.cloneDeep(players);
    room2.game = null;

    expect(room2.players.length).toEqual(2);
    room2.deletePlayer(players[1].socket);
    expect(room2.players.length).toEqual(1);
    room2.deletePlayer(players[0].socket);
    expect(room2.players.length).toEqual(0);
    room2.deletePlayer(players[0].socket);
    expect(room2.deletePlayer(players[0].socket)).toBeFalsy();
  });
});
