import React from "react";
import { connect } from "react-redux";
import eventSocket from "../../common/eventSocket";
import { launchGame } from "../gameManager";
import { actionStartGame } from "../actions/actionRoom";

export const buttonPlay = (state, dispatchRoom) => {
  console.log("handle click start");
  if (state.clearInterval === -1) {
    state.socket.emit(eventSocket.START_GAME, (listPlayers, listPieces) => {
      listPlayers = listPlayers.filter(value => value !== state.playerName);

      dispatchRoom(actionStartGame(listPlayers, listPieces));
      launchGame(dispatchRoom);
      console.log("handle click callback");
    });
  }
  console.log("handle click end");
};

export const mapStateToProps = _state => {
  const admin = _state.admin;
  return { admin };
};

export const Play = ({ state, admin, dispatchRoom }) => {
  if (admin === true) {
    return (
      <button onClick={() => buttonPlay(state, dispatchRoom)}>Play</button>
    );
  }
  return <span />;
};

const PlayButton = connect(mapStateToProps)(Play);

export const Info = ({ state, admin, dispatchRoom }) => {
  // console.log(actionClick);
  return (
    <div className="info">
      {state.winner}
      <PlayButton state={state} admin={admin} dispatchRoom={dispatchRoom} />
    </div>
  );
};

export const Title = () => {
  return <div className="title">Red Tetris</div>;
};

const AppBoardInfo = ({ state, dispatchRoom }) => {
  return (
    <div className="app-board-left">
      <Title />
      <Info state={state} dispatchRoom={dispatchRoom} />
    </div>
  );
};

export default AppBoardInfo;
