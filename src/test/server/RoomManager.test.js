import RoomsManager from "../../server/RoomsManager";

describe("SERVER/ROOMMANAGER.JS", () => {
  const roomName = "room";
  const playerName = "player1";
  const clientSocket = {
    id: "123",
    roomName: "",
    playerName: "player1",
    on: jest.fn(),
    join: jest.fn(),
    leave: jest.fn(),
    emit: jest.fn(),
    to: () => {
      return {
        emit: jest.fn()
      };
    }
  };
  const io = {
    emit: () => {}
  };
  const clientCallBack = a => a;
  const sendListRoomsPlayers = io => {
    const rooms = {
      room: {
        game: true
      }
    };
  };
  it("should construct a new roomsManager", () => {
    const roomsManager = new RoomsManager();
    expect(roomsManager).toHaveProperty("listRoomsName");
    expect(roomsManager).toHaveProperty("listPlayersName");
    expect(roomsManager).toHaveProperty("rooms");
  });

  it("should create a new Room without joining a room", () => {
    const roomsManager = new RoomsManager();
    const JoinRoom = (
      roomName,
      playerName,
      clientSocket,
      clientCallBack,
      io
    ) => {
      return true;
    };
    roomsManager.joinRoom = JoinRoom;
    roomsManager.sendListRoomsPlayers = sendListRoomsPlayers;
    expect(
      roomsManager.createRoom(
        roomName,
        playerName,
        clientSocket,
        clientCallBack,
        io
      )
    ).toBeTruthy();
  });

  it("should create a new Room and call joinRoom", () => {
    const roomsManager = new RoomsManager();
    const JoinRoom = (
      roomName,
      playerName,
      clientSocket,
      clientCallBack,
      io
    ) => {
      return true;
    };
    roomsManager.listRoomsName.push(roomName);
    roomsManager.joinRoom = JoinRoom;
    roomsManager.sendListRoomsPlayers = sendListRoomsPlayers;
    expect(
      roomsManager.createRoom(
        roomName,
        playerName,
        clientSocket,
        clientCallBack,
        io
      )
    ).toBeTruthy();
  });

  it("should return false if it's not possible to join the room", () => {
    const roomsManager = new RoomsManager();
    expect(
      roomsManager.joinRoom(
        roomName,
        playerName,
        clientSocket,
        clientCallBack,
        io
      )
    ).toBeFalsy();
    roomsManager.listRoomsName.push(roomName);
    roomsManager.listPlayersName.push(playerName);
    expect(
      roomsManager.joinRoom(
        roomName,
        playerName,
        clientSocket,
        clientCallBack,
        io
      )
    ).toBeFalsy();
  });

  it("should return false if it s possible to join the room and game !== false", () => {
    const roomsManager = new RoomsManager();
    const addPlayer = (playerName, clientSocket) => {};
    roomsManager.listRoomsName.push(roomName);
    roomsManager.rooms = {
      room: {
        addPlayer: addPlayer,
        game: true
      }
    };
    expect(
      roomsManager.joinRoom(
        roomName,
        playerName,
        clientSocket,
        clientCallBack,
        io
      )
    ).toBeTruthy();
  });

  it("should return false if it s possible to join the room and game === false", () => {
    const roomsManager = new RoomsManager();
    const addPlayer = (playerName, clientSocket) => {};
    roomsManager.listRoomsName.push(roomName);
    roomsManager.rooms = {
      room: {
        addPlayer: addPlayer,
        game: false
      }
    };
    expect(
      roomsManager.joinRoom(
        roomName,
        playerName,
        clientSocket,
        clientCallBack,
        io
      )
    ).toBeTruthy();
  });

  it("should delete the player with the given client socket", () => {
    const roomsManager = new RoomsManager();
    const deletePlayer = (playerName, clientSocket) => {};
    roomsManager.listPlayersName = ["player1", "player2"];
    roomsManager.rooms = {
      room: {
        deletePlayer: deletePlayer
      }
    };
    roomsManager.deletePlayer(clientSocket, io);
    expect(roomsManager.listPlayersName).toEqual(["player2"]);
  });

  it("should delete the player with the given client socket", () => {
    const roomsManager = new RoomsManager();
    const deletePlayer = (playerName, clientSocket) => {
      return false;
    };
    const deleteRoom = roomName => {};
    roomsManager.listPlayersName = ["player1", "player2"];
    roomsManager.deleteRoom = deleteRoom;
    roomsManager.rooms = {
      room: {
        deletePlayer: deletePlayer
      }
    };
    roomsManager.deletePlayer(clientSocket, io);
    expect(roomsManager.listPlayersName).toEqual(["player2"]);
  });

  it("should delete the room with the given roomName", () => {
    const roomsManager = new RoomsManager();
    roomsManager.listRoomsName = ["room1", "room2"];
    roomsManager.deleteRoom("room1");
  });
});
