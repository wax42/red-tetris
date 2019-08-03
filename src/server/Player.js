const eventSocket = require("../common/common");
const Piece = require("./Piece");
class Player {
  constructor(name, roomName, clientSocket) {
    this.score = 0;
    this.name = name;
    this.roomName = roomName;
    this.id = clientSocket.id;
    this.socket = clientSocket;
    this.grid = [];
    this.createListener();
  }
  generateSpectrum() {
    // Take the grid and return a spectrum
  }

  createListener() {
    this.socket.on(eventSocket.START_GAME, () => {
      this.socket.to(this.roomName).emit(eventSocket.START_GAME);
    });

    this.socket.on(eventSocket.NEXT_PIECE, ()=> {
      let piece = new Piece();
      console.log("Send New Piece", piece.grid);
      this.socket.emit(eventSocket.NEXT_PIECE, piece.grid);
    });
  }
}

module.exports = Player;
