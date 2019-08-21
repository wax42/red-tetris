const eventSocket = require("../common/eventSocket");
const RoomsManager = require("./RoomsManager");



const handleClient = client => {
  console.log(eventSocket.CONNECT, client.id);

  // setTimeout(() => {
  //   roomsManager.sendListRoomsPlayers(io);
  // }, 1000); // le temps que le components soit creer

  client.on(eventSocket.LIST_ROOMS_PLAYERS, callback => {
    console.log("On LIST ROOOM PLAYER");
    callback(roomsManager.listRoomsName, roomsManager.listPlayersName);
  });

  client.on(eventSocket.CREATE_ROOM, (roomName, playerName, clientCallback) => {
    if (
      roomsManager.createRoom(
        roomName,
        playerName,
        client,
        clientCallback,
        io
      ) === false
    ) {
      console.error("Error Player with the same name in the room: " + roomName);
    }
  });

  client.on(eventSocket.JOIN_ROOM, (roomName, playerName, clientCallback) => {
    if (
      roomsManager.joinRoom(roomName, playerName, client, clientCallback, io) ===
      false
    ) {
      console.error("Error Player with the same name in the room: " + roomName);
    }
  });

  client.on(eventSocket.LEAVE_ROOM, () => {
    let roomName = client.roomName;
    if (client.playerName !== undefined) {
      roomsManager.listPlayersName = roomsManager.listPlayersName.filter(value => value !== client.playerName);
      console.log("Leave rooom", roomsManager.listPlayersName, client.playerName);
      client.playerName = undefined;
      roomsManager.deletePlayer(client);
      if (
        roomsManager.rooms[roomName] !== undefined &&
        roomsManager.rooms[roomName].game !== null
      ) {
        let winner = roomsManager.rooms[roomName].game.checkWhoIsWinner();
        if (winner !== null) {
          client.to(roomName).emit(eventSocket.WINNER_IS, winner);
        }
        if (
          roomsManager.rooms[roomName].game.players.length === 1 ||
          winner !== null
        ) {
          delete roomsManager.rooms[roomName].game;
          roomsManager.rooms[roomName].game = null;
        }
      }
    }
  });

  client.on(eventSocket.DISCONNECT, () => {
    let roomName = client.roomName;
    if (client.playerName !== undefined) {
      roomsManager.deletePlayer(client);
      if (
        roomsManager.rooms[roomName] !== undefined &&
        roomsManager.rooms[roomName].game !== null
      ) {
        let winner = roomsManager.rooms[roomName].game.checkWhoIsWinner();
        if (winner !== null) {
          client.to(roomName).emit(eventSocket.WINNER_IS, winner);
        }
        if (
          roomsManager.rooms[roomName].game.players.length === 1 ||
          winner !== null
        ) {
          delete roomsManager.rooms[roomName].game;
          roomsManager.rooms[roomName].game = null;
        }
      }
    }
    console.log("disconnect", client.id, client.playerName);
  });
};

const server = require("http").createServer();
const io = require("socket.io")(server);
let roomsManager = new RoomsManager();

io.on("connect", client => handleClient(client));

server.listen(3001);