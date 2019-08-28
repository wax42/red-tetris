const Game = require("./Game.js");
const Player = require("./Player.js");
const _ = require("lodash");
const eventSocket = require("../common/eventSocket");

class Room {
  constructor(name, playerName, clientSocket) {
    this.name = name;
    this.admin = clientSocket.id;
    this.game = null;
    this.players = [];
    this.addPlayer(playerName, clientSocket);
  }

  newGame(optionGames) {
    this.game = new Game([...this.players], optionGames);
  }
  addPlayer(playerName, clientSocket) {
    let newPlayer = new Player(playerName, this, clientSocket);
    clientSocket.join(this.name);
    this.players.push(newPlayer);
    console.log("New player " + playerName + " add in room ", this.name);

  }

  deletePlayer(clientSocket) {
    console.log("Delete player " + clientSocket.playerName + " in room " + this.name);

    if (this.game !== null) {
      this.game.players = _.filter(this.game.players, player => {
        return player.id !== clientSocket.id;
      });
    }

    this.players = _.filter(this.players, player => {
      return player.id !== clientSocket.id;
    });

    clientSocket.removeAllListeners(eventSocket.NEXT_PIECE);
    clientSocket.removeAllListeners(eventSocket.LINE_BREAK);
    clientSocket.removeAllListeners(eventSocket.LOSE);
    clientSocket.removeAllListeners(eventSocket.START_GAME);
    clientSocket.leave(this.name);

    if (this.players.length === 0) {
      return false;
    }

    if (clientSocket.id === this.admin) {
      this.admin = this.players[0].id;
      this.players[0].socket.emit(eventSocket.IS_NEW_ADMIN);
      console.log("New admin " + this.players[0].name + " in room" + this.name);
    }
    return true;
  }
}

module.exports = Room;