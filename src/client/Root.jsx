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

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const store = createStore(reducers, composeWithDevTools(applyMiddleware(socketMiddleware())));

const mapStateToProps = _state => {
  const state = {
    playerName: _state.playerName,
    listRooms: _state.listRooms,
    listPlayers: _state.listPlayers,
    socket: _state.socket,
    error: _state.error
  };
  return { state };
};

export const routeHashError = (hash, state, actionJoinRoom) => {
  let result = hash.split("[");

  if (/^#.+\[{1}[^\[\]]+\]{1}$/.test(hash) === false || result.length !== 2) {
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
    return "Room doesn't exist";
  }
  if (state.listPlayers.includes(player_name) === true && player_name !== state.playerName) {
    return "Player name already exists";
  }
  if (state.playerName !== player_name) {
    actionJoinRoom(room_name, player_name);
  }
  return "";
};

export const Routing = ({ state, actionJoinRoom, actionListRoomPlayer }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (state.socket) {
      state.socket.emit(eventSocket.LIST_ROOMS_PLAYERS, (listRooms, listPlayers) => {
        setLoading(false);
        actionListRoomPlayer(listRooms, listPlayers);
      });
      state.socket.on(eventSocket.LIST_ROOMS_PLAYERS, (listRooms, listPlayers) => {
        actionListRoomPlayer(listRooms, listPlayers);
      });
    }
    return () => {
      state.socket.removeListener(eventSocket.LIST_ROOMS_PLAYERS);
    };
  }, [actionListRoomPlayer, state.socket]);
  window.location.path = "/";
  let hash = window.location.hash;

  if (state.error !== null) {
    return <Home error={state.error} />;
  }

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

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#f9f9f9",
      dark: "#c6c6c6",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff9f88",
      main: "#ff6d5b",
      dark: "#c63b31",
      contrastText: "#fff"
    }
  }
});

const Root = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RoutingRedux />
      </ThemeProvider>
    </Provider>
  );
};

/* if (process.env.NODE_ENV === 'test'){
  export default Root

} else { */
export default Root;
