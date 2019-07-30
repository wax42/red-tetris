import React from "react";
import { connect } from "react-redux";
import { actionStartGame } from "../actions/actions";

const handleClick = action => {
  action();
};

const mapStateToProps = state => {
  const test = state;
  return { test };
};

const Info = ({ test, actionStartGame }) => {
  // console.log(actionClick);
  return (
    <div className="info">
      {test.name}
      <button onClick={() => handleClick(actionStartGame)}>Play</button>
    </div>
  );
};

const InfoRedux = connect(
  mapStateToProps,
  { actionStartGame }
)(Info);

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
