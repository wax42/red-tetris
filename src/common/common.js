const eventSocket = {
  CONNECT: "connection",
  DISCONNET: "disconnect",
  CREATE_ROOM: "create_room",
  JOIN_ROOM: "join_room",
  START_GAME: "start_game",
  NEXT_PIECE: "next_piece",
  LINE_BREAK: "line_break",
  LIST_ROOM_PLAYER: "list_room_player",
  SEND_SPECTRUMS: "send_spectrums",

  IS_NEW_ADMIN: "admin"
};

module.exports = eventSocket;
