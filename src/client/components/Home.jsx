import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { FaHome, FaIdBadge } from "react-icons/fa";
import { connect } from "react-redux";
import { actionCreateRoom, actionThunkUrl } from "../actions/actions";

let roomName = "";
let playerName = "";
let url = "";

//TODO validation
const getRoomName = event => {
  roomName = event.target.value;
};

const getPlayerName = event => {
  playerName = event.target.value;
};
// return <Redirect to='/dashboard' />

const handleClick = action => {
  if (roomName.length < 3 || playerName.length < 3) {
    console.error("name < 3 ");
  } else {
    action(roomName, playerName); // to complete
    window.location.hash = `#${roomName}[${playerName}]`;

    console.error("ui");
  }
};

const Home = ({ actionCreateRoom }) => {
  return (
    <div>
      <div className="home-title">Red Tetris</div>
      <div className="home">
        <div className="home-field">
          <div className="home-field-title">
            <FaHome className="home-icon" />
            <div>Room name</div>
          </div>

          <input
            className="home-input"
            type="text"
            name="room-name"
            onChange={e => getRoomName(e)}
          />
        </div>
        <div className="home-field">
          <div className="home-field-title">
            <FaIdBadge className="home-icon" />
            <div>Player name</div>
          </div>

          <input
            className="home-input"
            type="text"
            name="player-name"
            onChange={e => getPlayerName(e)}
          />
        </div>
        <button
          className="home-btn"
          onClick={() => handleClick(actionCreateRoom)}
          // to={{ pathname: "/", hash: "test[test]" }}
        />
      </div>
    </div>
  );
};

const HomeRedux = connect(
  null,
  { actionCreateRoom }
)(Home);

export default HomeRedux;
