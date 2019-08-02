const eventSocket = require("../common/common");
const RoomsManager = require("./RoomsManager");

const handleClient = client => {
  console.log(eventSocket.CONNECT, client.id);

  setTimeout(() => {
    roomsManager.sendListRoomsPlayers(io);
  }, 1000); // le temps que le components soit creer

  client.on(eventSocket.CREATE_ROOM, (roomName, playerName, clientCallback) => {
    // Check si la room existe deja !!!!! apres manger
    if (roomsManager.createRoom(roomName, playerName, client) === false) {
      if (roomsManager.joinRoom(roomName, playerName, client) == true) {
        // Gestion error is not possible to join this room
        // Room is not create
        console.log("JOIN ROOM VALIDATE");

        clientCallback("Succes Join ROOM: " + roomName);
      } else {
        // si ça rentre la c chelou
        // si player existe on rentre ici - rien de creer cote serveur mais App rendue client
        console.log("JOIN ROOM chelou");

        clientCallback("Is not possible to join room:  " + roomName);
      }
      // Add new player in this fucking room
    } else {
      roomsManager.sendListRoomsPlayers(io);
      clientCallback("Succes Create new ROOM:  " + roomName);

      //   setInterval(() => {
      //     client.to(roomName).emit("blabla", "boubou");
      //     console.log("SET INTERVAL EMIT");
      //   }, 2000);
    }
  });

  client.on(eventSocket.JOIN_ROOM, (roomName, playerName, clientCallback) => {
    if (roomsManager.joinRoom(roomName, playerName, client) == false) {
      // Gestion error is not possible to join this room
      // Room is not create
      clientCallback("Is not possible to join room:  " + roomName);
    } else {
      roomsManager.sendListRoomsPlayers(io);
      clientCallback("Succes Join ROOM: " + roomName);
    }
  });

  client.on(eventSocket.DISCONNET, () => {
    if (client.playerName !== undefined) {
      roomsManager.deletePlayer(client);
    }
    console.log("disconnect", client.id);
    console.log(roomsManager.rooms);
  });
};

const server = require("http").createServer();
const io = require("socket.io")(server);
let roomsManager = new RoomsManager();

io.on("connect", client => handleClient(client));

server.listen(3001);
