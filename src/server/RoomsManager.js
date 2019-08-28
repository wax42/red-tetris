const _ = require("lodash");
const eventSocket = require("../common/eventSocket");
const Room = require("./Room.js");
const ERROR = require("../common/error");

class RoomsManager {
  constructor() {
    this.listRoomsName = [];
    this.listPlayersName = [];
    this.rooms = {};
  }
  createRoom(roomName, playerName, clientSocket, clientCallback, io) {
    if (this.listRoomsName.includes(roomName) === true) {
      return this.joinRoom(roomName, playerName, clientSocket, clientCallback, io);
    }
    let room = new Room(roomName, playerName, clientSocket);
    this.rooms[roomName] = room;
    this.listRoomsName.push(roomName);
    this.listPlayersName.push(playerName);
    clientSocket.roomName = roomName;
    clientSocket.playerName = playerName;
    this.sendListRoomsPlayers(io);
    clientCallback("Success create new room:  " + roomName, {
      spectator: false,
      admin: true,
      error: false
    });
    console.log("Success create new room:  " + roomName)
    return true;
  }

  joinRoom(roomName, playerName, clientSocket, clientCallback, io) {
    if (this.listRoomsName.includes(roomName) === false || this.listPlayersName.includes(playerName) === true) {
      clientCallback(ERROR.DUPLICATE_PLAYER_IN_ROOM + roomName, {
        spectator: false,
        error: true
      });
      return false;
    }

    this.rooms[roomName].addPlayer(playerName, clientSocket);
    this.listPlayersName.push(playerName);
    clientSocket.roomName = roomName;
    clientSocket.playerName = playerName;

    this.sendListRoomsPlayers(io);
    if (this.rooms[roomName].game !== null) {
      clientCallback("Success join room in spectator mode: " + roomName, {
        spectator: true,
        error: false
      });
      console.log("Success join room in spectator mode:  " + roomName)
    } else {
      clientCallback("Success join room: " + roomName, {
        spectator: false,
        error: false
      });
      console.log("Success join room:  " + roomName)
    }
    return true;
  }
  sendListRoomsPlayers(io) {
    io.emit(eventSocket.LIST_ROOMS_PLAYERS, this.listRoomsName, this.listPlayersName);
  }
  deletePlayer(clientSocket, io) {
    this.listPlayersName = _.filter(this.listPlayersName, value => value !== clientSocket.playerName);
    if (this.rooms[clientSocket.roomName].deletePlayer(clientSocket) === false) {
      this.deleteRoom(clientSocket.roomName);
    }
    this.sendListRoomsPlayers(io);
  }

  deleteRoom(roomName) {
    console.log("Delete room ", roomName);
    this.listRoomsName = _.filter(this.listRoomsName, name => {
      return roomName !== name;
    });
    delete this.rooms[roomName];
  }
}

module.exports = RoomsManager;