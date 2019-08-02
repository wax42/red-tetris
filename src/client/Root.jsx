// import logo from './logo.svg';
import React from "react";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers/reducers";
import socketMiddleware from "./middlewares/socketMiddleware";
import Home from "./components/Home";
import Room from "./components/Room";
import { composeWithDevTools } from "redux-devtools-extension";
import { actionJoinRoom } from "./actions/actions";

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(socketMiddleware()))
);

const mapStateToProps = _state => {
  const state = {
    playerName: _state.playerName,
    listRooms: _state.listRooms,
    listPlayers: _state.listPlayers
  };
  return { state };
};

const routeHashError = (hash, state, actionJoinRoom) => {
  let result = hash.split("[");

  if (result.length !== 2) {
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
    actionJoinRoom(room_name, player_name);
  }
  return "";
};

const Routing = ({ state, actionJoinRoom }) => {
  window.location.path = "/";
  let hash = window.location.hash;

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
  { actionJoinRoom }
)(Routing);

const Root = () => {
  return (
    <Provider store={store}>
      <RoutingRedux />
    </Provider>
  );
};

export default Root;
