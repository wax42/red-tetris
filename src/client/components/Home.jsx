import React, { useEffect } from "react";
import { FaHome, FaIdBadge } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import { actionCreateRoom, actionListRoomPlayer } from "../actions/actions";

let roomName = "";
let playerName = "";

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
    window.location.hash = `#${roomName}[${playerName}]`;
    action(roomName, playerName); // to complete

    console.log(window.location.hash);
    console.error("New HAsh", window.location.hash);
  }
};

const Home = ({ error, actionCreateRoom }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Home mounted ! What is the phoque");
    dispatch(actionListRoomPlayer());
  }, [dispatch]);

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
      <h1>{error}</h1>
    </div>
  );
};

export default connect(
  null,
  { actionCreateRoom }
)(Home);
