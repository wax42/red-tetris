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
    // Check si la room existe deja !!!!! apres manger
    if (
      roomsManager.createRoom(
        roomName,
        playerName,
        client,
        clientCallback,
        io
      ) === false
    ) {
      console.error("Error does not CREATE or JOIN room: " + roomName);
    }
  });

  client.on(eventSocket.JOIN_ROOM, (roomName, playerName, clientCallback) => {
    if (
      roomsManager.joinRoom(roomName, playerName, client, clientCallback, io) ==
      false
    ) {
      console.log("Is not possible to join room: " + roomName);
    }
  });

  client.on(eventSocket.LEAVE_ROOM, () => {
    if (client.playerName !== undefined) {
      roomsManager.deletePlayer(client);
    }
    console.log("LEabe room", client.id, client.playerName);
    console.log(roomsManager.rooms);
  });

  client.on(eventSocket.DISCONNECT, () => {
    if (client.playerName !== undefined) {
      roomsManager.deletePlayer(client);
    }
    console.log("disconnect", client.id, client.playerName);
    console.log(roomsManager.rooms);
  });
};

const server = require("http").createServer();
const io = require("socket.io")(server);
let roomsManager = new RoomsManager();

io.on("connect", client => handleClient(client));

server.listen(3001);
