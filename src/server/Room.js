const Game = require("./Game.js");
const Player = require("./Player.js");
const _ = require("lodash");
const eventSocket = require("../common/eventSocket");

class Room {
  constructor(name, playerName, clientSocket) {
    this.name = name;
    this.admin = clientSocket.id;
    // TODO add the admin in the lists of players
    this.game = null;
    this.players = [];
    this.addPlayer(playerName, clientSocket);
    // top score
  }

  newGame(optionGames) {
    this.game = new Game([...this.players], optionGames);
  }
  addPlayer(playerName, clientSocket) {
    let newPlayer = new Player(playerName, this, clientSocket);
    clientSocket.join(this.name);
    this.players.push(newPlayer);
    console.log("new player add in room", this.name, playerName);
    for (let player in this.players) {
      console.log(this.players[player].name);
    }
  }

  deletePlayer(clientSocket) {
    console.log("delete player in room", this.name, clientSocket.playerName);
    for (let player in this.players) {
      console.log(this.players[player].name);
    }


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

    // delete this.players[i]

    clientSocket.leave(this.name);

    if (this.players.length === 0) {
      console.log("tout est normal")
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