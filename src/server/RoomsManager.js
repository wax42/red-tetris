const Room = require("./Room.js");

class RoomsManager {
  constructor() {
    this.listRoomsName = ["room"];
    this.listPlayersName = [];
    this.rooms = {};
    // top score
  }
  createRoom(roomName, playerName, clientSocket) {
    console.log(
      "Create room RoomManager params: ",
      roomName,
      playerName,
      clientSocket.id
    );
    if (this.listRoomsName.includes(roomName) === true) {
      return false;
    }

    console.log("SOCKET ID CREATE ROOM ", clientSocket.id);
    let room = new Room(roomName, playerName, clientSocket);

    this.rooms[roomName] = room;

    console.log("rooms OBJSS", this.rooms);

    this.listRoomsName.push(roomName);
    this.listPlayersName.push(playerName);
    return true;
  }
  joinRoom(roomName, playerName, clientSocket) {
    //Check if player doesn't not exist
    if (
      this.listRoomsName.includes(roomName) === false ||
      this.listPlayersName.includes(playerName) === true
    ) {
      return false;
    }
    console.log("JoinRoom roomName: ", roomName);
    console.log("JoinRoom playerName: ", playerName);
    console.log("JoinRoom clientSocket: ", clientSocket);
    this.rooms[roomName].addPlayer(playerName, clientSocket);
    console.log("JOIN ROOM function", this.rooms[roomName]);
    return true;
  }
  sendListRoomsPlayers(io) {
    io.emit("LIST_ROOMS_PLAYERS", this.listRoomsName, this.listPlayersName);
  }
}

module.exports = RoomsManager;
