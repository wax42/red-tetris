const _ = require("lodash");
const eventSocket = require("../common/eventSocket");
const Room = require("./Room.js");

class RoomsManager {
  constructor() {
    this.listRoomsName = [];
    this.listPlayersName = [];
    this.rooms = {};
    // top score
  }
  createRoom(roomName, playerName, clientSocket, clientCallback, io) {
    console.log("Create room RoomManager params: ", roomName, playerName, clientSocket.id);
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
    clientCallback("Succes Create new ROOM:  " + roomName, {
      spectator: false,
      admin: true,
      error: false
    });
    return true;
  }

  joinRoom(roomName, playerName, clientSocket, clientCallback, io) {
    if (this.listRoomsName.includes(roomName) === false || this.listPlayersName.includes(playerName) === true) {
      clientCallback("Player with the same name in the room:  " + roomName, {
        spectator: false,
        admin: false,
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
      clientCallback("Succes Join ROOM in spectator: " + roomName, {
        spectator: true,
        admin: false,
        error: false
      });
    } else {
      clientCallback("Succes Join ROOM: " + roomName, {
        spectator: false,
        admin: false,
        error: false
      });
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
    this.listRoomsName = _.filter(this.listRoomsName, name => {
      return roomName !== name;
    });
    delete this.rooms[roomName];
  }
}

module.exports = RoomsManager;