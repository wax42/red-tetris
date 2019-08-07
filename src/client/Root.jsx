// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import socketMiddleware from "./middlewares/socketMiddleware";
import Home from "./components/Home";
import Room from "./components/Room";
import { composeWithDevTools } from "redux-devtools-extension";
import { actionJoinRoom, actionListRoomPlayer } from "./actions/actions";
import eventSocket from "../common/eventSocket";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(socketMiddleware()))
);

const mapStateToProps = _state => {
  const state = {
    playerName: _state.playerName,
    listRooms: _state.listRooms,
    listPlayers: _state.listPlayers,
    socket: _state.socket
  };
  return { state };
};

const routeHashError = (hash, state, actionJoinRoom) => {
  let result = hash.split("[");

  if (/^.+\[{1}[^\[\]]+\]{1}$/.test(hash) === false || result.length !== 2) {
    return "Hash invalid";
  }
  let room_name = result[0].slice(1);
  let player_name = result[1].slice(0, -1);

  if (/^[A-z0-9]{3,}$/.test(room_name) === false) {
    return "Room Name incorrect";
  }
  if (/^[A-z0-9]{3,}$/.test(player_name) === false) {
    return "Player Name incorrect";
  }
  // Home error
  if (state.listRooms.includes(room_name) === false) {
    return "Room don't exist";
  }
  if (
    state.listPlayers.includes(player_name) === true &&
    player_name !== state.playerName
  ) {
    return "Player name already exists";
  }
  if (state.playerName !== player_name) {
    console.log("Action Join room");
    actionJoinRoom(room_name, player_name);
  }
  return "";
};

const Routing = ({ state, actionJoinRoom, actionListRoomPlayer }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    state.socket.emit(
      eventSocket.LIST_ROOMS_PLAYERS,
      (listRooms, listPlayers) => {
        setLoading(false);
        actionListRoomPlayer(listRooms, listPlayers);
      }
    );
    state.socket.on(
      eventSocket.LIST_ROOMS_PLAYERS,
      (listRooms, listPlayers) => {
        actionListRoomPlayer(listRooms, listPlayers);
      }
    );
    return () => {
      state.socket.removeListener(eventSocket.LIST_ROOMS_PLAYERS);
    };
  }, [actionListRoomPlayer, state.socket]);
  window.location.path = "/";
  let hash = window.location.hash;

  if (loading === true) {
    return <Home error="SPinnner loading" />;
  }

  if (hash === "") {
    return <Home />;
  }
  let error = routeHashError(hash, state, actionJoinRoom);

  if (error !== "") {
    return <Home error={error} />;
  }
  return <Room />;
};

const RoutingRedux = connect(
  mapStateToProps,
  { actionJoinRoom, actionListRoomPlayer }
)(Routing);

const Root = () => {
  return (
    <Provider store={store}>
      <RoutingRedux />
    </Provider>
  );
};

export default Root;
