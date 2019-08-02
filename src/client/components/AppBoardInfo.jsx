import React from "react";
import { connect } from "react-redux";
import { actionStartGame } from "../actions/actions";

const handleClick = action => {
  action();
};

const mapStateToProps = _state => {
  const state = _state;
  return { state };
};

const Play = ({ admin, actionStartGame }) => {
  if (admin === true) {
    return <button onClick={() => handleClick(actionStartGame)}>Play</button>;
  }
  return <span />;
};

const PlayButton = connect(
  null,
  { actionStartGame }
)(Play);

const Info = ({ state }) => {
  // console.log(actionClick);
  return (
    <div className="info">
      {state.name}
      <PlayButton admin={state.admin} />
    </div>
  );
};

const InfoRedux = connect(mapStateToProps)(Info);

const Title = () => {
  return <div className="title">Red Tetris</div>;
};

const AppBoardInfo = () => {
  return (
    <div className="app-board-left">
      <Title />
      <InfoRedux />
    </div>
  );
};

export default AppBoardInfo;
