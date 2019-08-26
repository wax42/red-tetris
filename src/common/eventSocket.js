const eventSocket = {
  CONNECT: "connection",
  DISCONNECT: "disconnect",
  CREATE_ROOM: "create_room",
  JOIN_ROOM: "join_room",
  START_GAME: "start_game",
  NEXT_PIECE: "next_piece",
  LINE_BREAK: "line_break",
  LIST_ROOM_PLAYER: "list_room_player",
  SEND_SPECTRUMS: "send_spectrums",
  SEND_SPECTRUMS_SPECTATOR: "send_spectrums_spectator",
  IS_NEW_ADMIN: "admin",
  WINNER_IS: "winner_is",
  LOSE: "lose",
  LEAVE_ROOM: "leave_room",
  LIST_ROOMS_PLAYERS: "list_rooms_players",
  GAME_FINISH: "game_finish"
};

module.exports = eventSocket;