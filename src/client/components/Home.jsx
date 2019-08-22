import React, { useEffect, useState } from "react";
import { FaHome, FaIdBadge } from "react-icons/fa";
import { connect } from "react-redux";
import { actionCreateRoom } from "../actions/actions";

let roomName = "";
let playerName = "";

//TODO validation
export const getRoomName = event => {
  roomName = event.target.value;
};

export const getPlayerName = event => {
  playerName = event.target.value;
};

export const buttonCreateRoom = (action, setStateError) => {
  if (roomName.length < 3) {
    setStateError("Room name should have 3 characters at least");
  } else if (playerName.length < 3) {
    setStateError("Player name should have 3 characters at least");
  } else if (/^[A-z0-9]+$/.test(roomName) === false) {
    setStateError("Room name invalid");
  } else if (/^[A-z0-9]+$/.test(playerName) === false) {
    setStateError("Player name invalid");
  } else {
    window.location.hash = `#${roomName}[${playerName}]`;
    console.log("buttonCreateRoom", roomName);
    action(roomName, playerName); // to complete
  }
};

export const HomeCpt = ({ error, actionCreateRoom }) => {
  const [stateError, setStateError] = useState("");

  return (
    <div>
      <div className="home-title">Red Tetris</div>
      <div className="home">
        <div className="home-field">
          <div className="home-field-title">
            <FaHome className="home-icon" />
            <div>Room name</div>
          </div>

          <input className="home-input" type="text" name="room-name" onChange={e => getRoomName(e)} />
        </div>
        <div className="home-field">
          <div className="home-field-title">
            <FaIdBadge className="home-icon" />
            <div>Player name</div>
          </div>

          <input className="home-input" type="text" name="player-name" onChange={e => getPlayerName(e)} />
        </div>
        <button
          className="home-btn"
          onClick={() => buttonCreateRoom(actionCreateRoom, setStateError)}
          // to={{ pathname: "/", hash: "test[test]" }}
        >
          Créer une partie
        </button>
      </div>
      <h1 style={{ color: "pink" }}>
        {error} {stateError}
      </h1>
    </div>
  );
};

const Home = connect(
  null,
  { actionCreateRoom }
)(HomeCpt);

export default Home;
