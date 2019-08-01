const EVENT = require("../common/common");
const RoomManager = require("./RoomsManager");

const handleClient = client => {
  console.log("connect", client.id);

  setTimeout(() => {
    roomsManager.sendListRoomsPlayers(io);
  }, 1000); // le temps que le components soit creer

  client.on(EVENT.CREATE_ROOM, (roomName, playerName, clientCallback) => {
    // Check si la room existe deja !!!!! apres manger
    if (roomsManager.createRoom(roomName, playerName, client) === false) {
      if (roomsManager.joinRoom(roomName, playerName, client) == true) {
        // Gestion error is not possible to join this room
        // Room is not create
        console.log("JOIN ROOM VALIDATE");

        clientCallback("Succes Join ROOM: " + roomName);
      } else {
        // si ça rentre la c chelou
        console.log("JOIN ROOM chelou");

        clientCallback("Is not possible to join room:  " + roomName);
      }
      // Add new player in this fucking room
    } else {
      roomsManager.sendListRoomsPlayers(io);
      clientCallback("Succes Create new ROOM:  " + roomName);
    }
  });

  client.on("JOIN_ROOM", (roomName, playerName, clientCallback) => {
    if (roomsManager.joinRoom(roomName, playerName, client) == false) {
      // Gestion error is not possible to join this room
      // Room is not create
      clientCallback("Is not possible to join room:  " + roomName);
    } else {
      roomsManager.sendListRoomsPlayers(io);
      clientCallback("Succes Join ROOM: " + roomName);
    }
  });

  client.on("disconnect", () => {
    console.log("disconnect", client.id);
  });
};

const server = require("http").createServer();
const io = require("socket.io")(server);
let roomsManager = new RoomManager();

io.on("connect", client => handleClient(client));

server.listen(3001);
