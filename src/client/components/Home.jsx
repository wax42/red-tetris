import React, { useEffect, useState, createRef } from "react";
import { FaHome, FaIdBadge } from "react-icons/fa";
import { connect } from "react-redux";
import { actionCreateRoom } from "../actions/actions";
import { Button, TextField } from "@material-ui/core";

export const buttonCreateRoom = (
  action,
  setStateError,
  roomName,
  playerName
) => {
  console.log("create room", playerName, roomName);
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

export const HomeCpt = ({ theme, error, actionCreateRoom }) => {
  const [stateError, setStateError] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");
  return (
    <div>
      <div className="home-title">Red Tetris</div>
      <div className="home">
        <form className="form-home">
          <div className="home-field">
            <div className="home-field-title">
              <FaIdBadge className="home-icon" />
              <div>Room name</div>
            </div>
            <TextField
              color="red"
              label="Room"
              // value={roomName}
              onChange={e => setRoomName(e.target.value)}
              margin="normal"
              variant="outlined"
              className={"homeTextField"}
              inputProps={{
                style: {
                  fontFamily: "nunito"
                  /* color: "#f9f6e2",
                  borderColor: "#f9f6e2" */
                }
              }}
            />
          </div>
          <div className="home-field">
            <div className="home-field-title">
              <FaHome className="home-icon" />
              <div>Player name</div>
            </div>
            <TextField
              color="primary"
              label="Player"
              className={"homeTextField"}
              // value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </div>

          <Button
            color="secondary"
            size="large"
            variant="outlined"
            onClick={() =>
              buttonCreateRoom(
                actionCreateRoom,
                setStateError,
                roomName,
                playerName
              )
            }
          >
            Start
          </Button>
        </form>
      </div>

      <h1 style={{ color: "pink" }}>
        {error} {stateError}
      </h1>
      <div className="bird-container">
        <div className="bird">
          <div className="bird-beak2" />
          <div className="bird-beak1" />
          <div className="bird-body" />
          <div className="bird-eye" />
          <div className="bird-pupil" />
          <div className="bird-wing" />
          <div className="bird-hair" />
          RED TETRIS by ppichier & vguerand
        </div>
      </div>
    </div>
  );
};

const Home = connect(
  null,
  { actionCreateRoom }
)(HomeCpt);

export default Home;
