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
    console.log(
      "Create room RoomManager params: ",
      roomName,
      playerName,
      clientSocket.id
    );
    if (this.listRoomsName.includes(roomName) === true) {
      return this.joinRoom(
        roomName,
        playerName,
        clientSocket,
        clientCallback,
        io
      );
    }

    console.log("SOCKET ID CREATE ROOM ", clientSocket.id);
    let room = new Room(roomName, playerName, clientSocket);

    this.rooms[roomName] = room;

    console.log("rooms OBJSS", this.rooms);

    this.listRoomsName.push(roomName);
    this.listPlayersName.push(playerName);
    clientSocket.roomName = roomName;
    clientSocket.playerName = playerName;
    this.sendListRoomsPlayers(io);
    clientCallback("Succes Create new ROOM:  " + roomName);
    return true;
  }
  joinRoom(roomName, playerName, clientSocket, clientCallback, io) {
    //Check if player doesn't not exist
    if (
      this.listRoomsName.includes(roomName) === false ||
      this.listPlayersName.includes(playerName) === true
    ) {
      clientCallback("Is not possible to join room:  " + roomName);
      return false;
    }

    this.rooms[roomName].addPlayer(playerName, clientSocket);
    this.listPlayersName.push(playerName);
    clientSocket.roomName = roomName;
    clientSocket.playerName = playerName;

    this.sendListRoomsPlayers(io);
    if (this.rooms[roomName].game !== false) {
      clientCallback("Succes Join ROOM: " + roomName, true);
    } else {
      clientCallback("Succes Join ROOM: " + roomName, false);
    }
    console.log("Succes Join Room: ", this.rooms[roomName]);
    return true;
  }
  sendListRoomsPlayers(io) {
    io.emit(
      eventSocket.LIST_ROOMS_PLAYERS,
      this.listRoomsName,
      this.listPlayersName
    );
  }
  deletePlayer(clientSocket) {
    this.listPlayersName = _.filter(this.listPlayersName, name => {
      return clientSocket.playerName !== name;
    });
    if (
      this.rooms[clientSocket.roomName].deletePlayer(clientSocket) === false
    ) {
      this.deleteRoom(clientSocket.roomName);
    }
  }

  deleteRoom(roomName) {
    this.listRoomsName = _.filter(this.listRoomsName, name => {
      return roomName !== name;
    });
    delete this.rooms[roomName];
  }
}

module.exports = RoomsManager;
