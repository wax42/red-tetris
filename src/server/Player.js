const eventSocket = require("../common/eventSocket");
const Piece = require("./Piece");
const { GRID } = require("../common/common");

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
    let spectrum = {
      playerName: this.name,
      score: 0,
      grid: grid
    };
    this.grid = grid;
    console.log("generate spectrum", this.grid, this.name);
    return spectrum;
    // Take the grid and return a spectrum
  }

  createListener() {
    if (this.room.game) {
      this.socket.on(eventSocket.SEND_SPECTRUMS_SPECTATOR, callbackClient => {
        // filter
        let listSpectrums = {};
        for (let i = 0; i < this.room.players.length; i++) {
          let player = this.room.players[i];
          if (player.name !== this.name) {
            listSpectrums[player.name] = {
              playerName: player.name,
              score: 0,
              grid: player.grid
            };
          }
        }
        console.log(listSpectrums);
        callbackClient(listSpectrums);

        // qui faudra virer au la fin de la partie
      });
    }

    this.socket.on(eventSocket.START_GAME, callbackClient => {
      this.room.game = true;
      let listPieces = [];
      for (let i = 0; i < 4; i++) {
        let piece = new Piece();
        listPieces.push(piece.grid);
      }

      let listPlayerName = this.room.players.map(value => value.name);

      //listPlayerName

      console.log("START GAME", listPieces, listPlayerName, this.name);

      this.lose = false;
      callbackClient(listPlayerName, listPieces);
      this.socket
        .to(this.roomName)
        .emit(eventSocket.START_GAME, listPlayerName, listPieces);
    });

    this.socket.on(eventSocket.NEXT_PIECE, grid => {
      let piece = new Piece();
      this.socket.emit(eventSocket.NEXT_PIECE, piece.grid);
      this.socket
        .to(this.roomName)
        .emit(eventSocket.SEND_SPECTRUMS, this.generateSpectrum(grid));
    });

    this.socket.on(eventSocket.LINE_BREAK, nbrLine => {
      this.socket.to(this.roomName).emit(eventSocket.LINE_BREAK, nbrLine);
    });

    this.socket.on(eventSocket.LOSE, () => {
      this.lose = true;
      // DEMAIN ON REVIENS ICI !!!!!!!
      // this.socket.to(this.roomName).emit(eventSocket.LINE_BREAK, nbrLine);
    });
  }
}

module.exports = Player;
