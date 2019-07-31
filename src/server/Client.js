// const EVENT = require { EVENT } from '../common/common';
var rooms = [];
var listRooms = ["room"];
var listPlayers = [];

const handleClient = client => {
  console.log("connect", client.id);

  client.on("CREATE_ROOM", (clientData, clientCallback) => {
    // clientData --> roomName, playerName

    let room = new room(clientData.roomName, clientData.playerName, client.id);
    rooms.push(room);
    listRooms.push(clientData.roomName);
    listPlayers.push(clientData.playerName);
    clientCallback(); // Pour moi par pertinent
  });

  client.on("JOIN_ROOM", (clientData, clientCallback) => {
    // clientData --> roomName, playerName
    for (let room of rooms) {
      if (room.name === clientData.roomName) {
        room.addPlayer(clientData.playerName, client.id);
      }
    }
    listPlayers.push(clientData.playerName);
    clientCallback(); // Pour moi par pertinent
  });

  client.on("LIST_ROOMS_PLAYERS", (clientData, clientCallback) => {
    // clientData --> roomName, playerName
    clientCallback(listRooms, listPlayers);
  });

  // Examples
  client.on("event", data => {
    console.log(data);
  });
  setTimeout(() => {
    console.log("Emit msg");
    client.emit("test_server", "Salut");
  }, 10000);

  //   client.on('', data => {

  //   }

  client.on("disconnect", () => {
    console.log("disconnect", client.id);
  });
};

module.exports = handleClient;
