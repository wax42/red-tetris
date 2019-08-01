const Game = require("./Game.js");
const Player = require("./Player.js");

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
    let newPlayer = new Player(playerName, clientSocket.id);
    // clientSocket.join(this.name);
    this.players.push(newPlayer);
  }
}

module.exports = Room;
