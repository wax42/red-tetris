const ERROR = {

    SERVER_DOWN: "The server is currently down...",

    WAITING_CONNECTION: "Waiting for server connection",

    HASH_INVALID: "Hash must be formated this way : #roomName[playerName]",

    ROOMNAME_INVALID: "Room name must be alphanumerical and have between 3 and 12 characters",
    PLAYERNAME_INVALID: "Player name must be alphanumerical and have between 3 and 12 characters",

    ROOMNAME_INVALID_LENGTH: "Room name should have between 3 and 12 characters",
    PLAYERNAME_INVALID_LENGTH: "Player name should have between 3 and 12 characters",

    ROOMNAME_INEXISTANT: "Room name doesn't exist",
    PLAYERNAME_INEXISTANT: "Player name already exists",

    DUPLICATE_PLAYER_IN_ROOM: "Error Player with the same name in the room: "
};

module.exports = ERROR;