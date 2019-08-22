const eventSocket = require("../common/eventSocket");
const {
  Piece
} = require("./Piece");
const {
  GRID
} = require("../common/common");
const _ = require("lodash");

class Player {
  constructor(name, room, clientSocket) {
    this.score = 0;
    this.name = name;
    this.room = room;
    this.roomName = room.name;
    this.id = clientSocket.id;
    this.socket = clientSocket;
    this.grid = GRID;
    this.lose = false;
    this.createListener();
  }
  generateSpectrum(grid) {
    if (this.room.game !== null && this.room.game.optionsGames.spectrum === true) {
      let bool = false;
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 24; y++) {
          if (grid[y][x] !== "." || bool === true) {
            grid[y][x] = "9";
            bool = true;
          }
        }
        bool = false;
      }
    }

    let spectrum = {
      playerName: this.name,
      score: this.score,
      lose: this.lose,
      grid: grid
    };
    this.grid = grid;
    return spectrum;
    // Take the grid and return a spectrum
  }

  createListener() {
    if (this.room.game !== null) {
      this.socket.spectator = true;
      this.socket.on(eventSocket.SEND_SPECTRUMS_SPECTATOR, callbackClient => {
        let listSpectrums = {};
        for (let i = 0; i < this.room.game.players.length; i++) {
          let player = this.room.game.players[i];
          if (player.name !== this.name) {
            listSpectrums[player.name] = {
              playerName: player.name,
              score: player.score,
              grid: player.grid,
              lose: player.lose
            };
          }
        }
        callbackClient(listSpectrums);
      });
    }

    this.socket.on(eventSocket.START_GAME, (optionGames) => {
      console.log("c sa c mes options mon freere", optionGames)
      this.socket.spectator = false;
      // this.room.game = true; TODO DELETE IF IT"S WORK
      this.room.newGame(optionGames);

      let listPlayerName = this.room.game.players.map(value => value.name);

      this.lose = false;
      for (let i = 0; i < this.room.players.length; i++) {
        this.room.players[i].lose = false;
        let listPieces = [];
        for (let i = 0; i < 4; i++) {
          let piece = new Piece(this.room.game.optionsGames.invisibility);
          listPieces.push(piece.grid);
        }
        console.log("Piece generer ", listPieces, this.room.game.optionsGames.invisibility)
        this.room.players[i].socket.emit(eventSocket.START_GAME, listPlayerName, listPieces, optionGames);
      }

    });

    this.socket.on(eventSocket.NEXT_PIECE, grid => {
      console.log("Je recois event");
      let piece = this.room.game !== null ? new Piece(this.room.game.optionsGames.invisibility) : new Piece(true);
      console.log("J'emit new piece: ", piece);
      this.socket.emit(eventSocket.NEXT_PIECE, piece.grid);
      this.socket
        .to(this.roomName)
        .emit(eventSocket.SEND_SPECTRUMS, this.generateSpectrum(grid));
    });

    this.socket.on(eventSocket.LINE_BREAK, nbrLine => {
      this.score += nbrLine * 10;
      this.socket.to(this.roomName).emit(eventSocket.LINE_BREAK, nbrLine);
    });

    this.socket.on(eventSocket.LOSE, cb => {
      this.lose = true;
      let winner = this.room.game.checkWhoIsWinner();
      console.log("LOSE", winner);
      if (winner !== null) {
        console.log("WINNER IN PLAYER.JS", winner);
        this.socket.to(this.roomName).emit(eventSocket.WINNER_IS, winner);
        cb(winner);
        console.log("lose solo");
      }
      if (this.room.game.players.length === 1 || winner !== null) {
        delete this.room.game;
        this.room.game = null;
      }
    });
  }
}

module.exports = Player;