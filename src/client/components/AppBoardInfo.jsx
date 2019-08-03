import React from "react";
import { connect } from "react-redux";
import { actionStartGame } from "../actions/actions";
import eventSocket from "../../common/common";
import { launchGame } from "../gameManager";

const handleClick = (dispatchRoom, socket) => {
  launchGame(dispatchRoom);
  socket.emit(eventSocket.START_GAME);
};

const mapStateToProps = _state => {
  const admin = _state.admin;
  const socket = _state.socket;
  return { admin, socket };
};

const Play = ({ admin, socket, dispatchRoom }) => {
  if (admin === true) {
    return (
      <button onClick={() => handleClick(dispatchRoom, socket)}>Play</button>
    );
  }
  return <span />;
};

const PlayButton = connect(mapStateToProps)(Play);

const Info = ({ admin, dispatchRoom }) => {
  // console.log(actionClick);
  return (
    <div className="info">
      <PlayButton admin={admin} dispatchRoom={dispatchRoom} />
    </div>
  );
};

const Title = () => {
  return <div className="title">Red Tetris</div>;
};

const AppBoardInfo = ({ dispatchRoom }) => {
  return (
    <div className="app-board-left">
      <Title />
      <Info dispatchRoom={dispatchRoom} />
    </div>
  );
};

export default AppBoardInfo;
