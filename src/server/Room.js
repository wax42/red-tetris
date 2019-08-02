const Game = require("./Game.js");
const Player = require("./Player.js");
const _ = require("lodash");
const eventSocket = require("../common/common");

class Room {
  constructor(name, playerName, clientSocket) {
    this.name = name;
    this.admin = clientSocket.id; // hash / id
    // TODO add the admin in the lists of players
    this.game = null;
    this.players = [];
    this.addPlayer(playerName, clientSocket);
    // top score
  }

  newGame() {
    this.game = new Game(this.players);
  }
  addPlayer(playerName, clientSocket) {
    console.log(
      "New player add in room: ",
      this.name,
      playerName,
      clientSocket.id
    );
    let newPlayer = new Player(playerName, this.name, clientSocket);
    clientSocket.join(this.name);
    this.players.push(newPlayer);
  }

  deletePlayer(clientSocket) {
    this.players = _.filter(this.players, player => {
      return player.id !== clientSocket.id;
    });
    clientSocket.leave(this.name);

    if (this.players.length === 0) {
      return false;
    }

    if (clientSocket.id === this.admin) {
      this.admin = this.players[0].id;
      this.players[0].socket.emit(eventSocket.IS_NEW_ADMIN);
    }
    return true;
  }
}

module.exports = Room;
