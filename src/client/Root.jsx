// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
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

const mapStateToProps = state => {
  const _state = state;
  return { _state };
};

const Routing = ({ _state, actionJoinRoom }) => {
  const [listRooms, setListRooms] = useState([]);
  const [listPlayers, setListPlayers] = useState([]);

  useEffect(() => {
    const event = async () => {
      await _state.socket.on("LIST_ROOMS_PLAYERS", (rooms, players) => {
        setListPlayers(players);
        setListRooms(rooms);
      });
    };
    event();
    console.log("updated component");
  });

  console.log("ListPlayer andd rooms", listPlayers, listRooms);

  window.location.path = "/";
  let hash = window.location.hash;

  if (hash === "") {
    console.log("hash empty");
    return <Home />;
  }

  let result = hash.split("[");

  if (result.length !== 2) {
    console.log("lenght");
    window.location.hash = "";
    return <Home error="hash Invalid" />;
  }

  let room_name = result[0].slice(1);
  let player_name = result[1].slice(0, -1);

  if (/^[A-z0-9]+$/.test(room_name) === false) {
    window.location.hash = "";
    console.log("room name invalid");

    return <Home error="Room Name incorrect" />;
  }

  if (/^[A-z0-9]+$/.test(player_name) === false) {
    window.location.hash = "";
    console.log("player name invalid");

    return <Home error="Player Name incorrect" />;
  }

  if (listRooms.includes(room_name) === false) {
    // window.location.hash = "";
    console.log("room don't exist", window.location.hash, window.location.path);

    return <Home error="Room don't exist" />;
  }

  if (
    listPlayers.includes(player_name) === true &&
    player_name !== _state.playerName
  ) {
    window.location.hash = "";
    console.log("player already exist");

    return <Home error="Player name already exists" />;
  }

  if (_state.playerName !== player_name) {
    console.log("JOIN ROOM");

    actionJoinRoom(room_name, player_name);
    // Il va falloir creer / add un nouveau player a la room
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
