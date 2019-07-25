import React from "react";
import { connect } from "react-redux";
import { actionClick } from "../actions/actions";

const handleClick = action => {
  console.log("test");
  action();
};

const mapStateToProps = state => {
  console.log(state);

  const test = state;
  return { test };
};

const Info = ({ test, actionClick }) => {
  console.log("info");
  // console.log(actionClick);
  return (
    <div className="info">
      {test.name}
      <button onClick={() => handleClick(actionClick)}>Click me</button>
    </div>
  );
};

const InfoRedux = connect(
  mapStateToProps,
  { actionClick }
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
