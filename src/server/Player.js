const eventSocket = require("../common/common");
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
  }
}

module.exports = Player;
