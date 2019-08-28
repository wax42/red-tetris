const eventSocket = require("../common/eventSocket");
const {
  Piece
} = require("./Piece");
const {
  GRID
} = require("../common/common");

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
    this.nb_win = 0;
    this.createListener();
  }
  generateSpectrum(grid) {
    if (
      this.room.game !== null &&
      this.room.game.optionsGames.spectrum === true
    ) {
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
      grid: grid,
      spectator: this.socket.spectator,
      nb_win: this.nb_win
    };
    this.grid = grid;
    return spectrum;
  }

  createListener() {
    let listSpectrums = {};
    if (this.room.game !== null) {
      this.socket.spectator = true;
      for (let i = 0; i < this.room.game.players.length; i++) {
        let player = this.room.game.players[i];
        if (player.name !== this.name) {
          listSpectrums[player.name] = {
            playerName: player.name,
            score: player.score,
            grid: player.grid,
            lose: player.lose,
            nb_win: player.nb_win,
            spectator: player.socket.spectator
          };
        }
      }
    } else {
      for (let i = 0; i < this.room.players.length; i++) {
        let player = this.room.players[i];
        if (player.name !== this.name) {
          listSpectrums[player.name] = {
            playerName: player.name,
            score: player.score,
            grid: GRID,
            lose: player.lose,
            nb_win: player.nb_win,
            spectator: player.socket.spectator
          };
        }
      }
    }
    this.socket.emit(eventSocket.SEND_SPECTRUMS_SPECTATOR, listSpectrums);
    this.socket
      .to(this.roomName)
      .emit(eventSocket.SEND_SPECTRUMS, this.generateSpectrum(GRID));

    this.socket.on(eventSocket.START_GAME, optionGames => {
      this.socket.spectator = false;
      this.score = 0;
      this.room.newGame(optionGames);
      let listPlayerName = this.room.game.players.map(value => value.name);
      this.lose = false;
      for (let i = 0; i < this.room.players.length; i++) {
        this.room.players[i].lose = false;
        let listPieces = [];
        for (let i = 0; i < 11; i++) {
          let piece = new Piece(this.room.game.optionsGames.invisibility);
          listPieces.push(piece.grid);
        }
        this.room.players[i].socket.emit(
          eventSocket.START_GAME,
          listPlayerName,
          listPieces,
          optionGames
        );
      }
    });

    this.socket.on(eventSocket.NEXT_PIECE, grid => {
      let piece =
        this.room.game !== null ?
        new Piece(this.room.game.optionsGames.invisibility) :
        new Piece(true);
      this.socket.emit(eventSocket.NEXT_PIECE, piece.grid);
      this.socket
        .to(this.roomName)
        .emit(eventSocket.SEND_SPECTRUMS, this.generateSpectrum(grid));
    });

    this.socket.on(eventSocket.LINE_BREAK, nbrLine => {
      this.score += nbrLine * 10;
      if (nbrLine !== 1)
        this.socket.to(this.roomName).emit(eventSocket.LINE_BREAK, nbrLine - 1);
    });

    this.socket.on(eventSocket.LOSE, () => {
      this.lose = true;
      let winner = this.room.game.checkWhoIsWinner();
      for (let i in this.room.game.players)
        if (winner === this.room.game.players[i].name) {
          this.room.game.players[i].nb_win += 1;
        }
      if (winner !== null) {
        console.log("Winner is ", winner);
        this.socket.to(this.roomName).emit(eventSocket.WINNER_IS, winner);
        this.socket.emit(eventSocket.WINNER_IS, winner);
      }
      if (this.room.game.players.length === 1 || winner !== null) {
        delete this.room.game;
        this.room.game = null;
        this.socket.emit(eventSocket.GAME_FINISH);
      }
    });
  }
}

module.exports = Player;