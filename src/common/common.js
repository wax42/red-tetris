const eventSocket = {
  CONNECT: "connection",
  DISCONNET: "disconnet",
  CREATE_ROOM: "create_room",
  JOIN_ROOM: "join_room",
  START_GAME: "start_game",
  NEXT_PIECE: "next_piece",
  LINE_BREAK: "line_break",
  LIST_ROOM_PLAYER: "list_room_player",
  ROOM_ADD_PLAYER: "room_add_player",
  ROOM_DEL_PLAYER: "room_del_player",
  SEND_SPECTRUMS: "send_spectrums"
};

module.exports = eventSocket;
