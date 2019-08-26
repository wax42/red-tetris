import React, { useEffect, useState, createRef } from "react";
import { FaHome, FaIdBadge } from "react-icons/fa";
import { connect } from "react-redux";
import { actionCreateRoom } from "../../actions/actionsRedux";
import { Button, TextField, Snackbar } from "@material-ui/core";
import { AutoComplete } from "./AutoComplete";
import ERROR from "../../../common/error";

export const buttonCreateRoom = (action, setStateError, roomName, playerName) => {
  if (roomName.length < 3 && roomName.length > 12) {
    setStateError(ERROR.ROOMNAME_INVALID_LENGTH);
  } else if (playerName.length < 3 && playerName.length > 12) {
    setStateError(ERROR.PLAYERNAME_INVALID_LENGTH);
  } else if (/^[A-z0-9]+$/.test(roomName) === false) {
    setStateError(ERROR.ROOMNAME_INVALID);
  } else if (/^[A-z0-9]+$/.test(playerName) === false) {
    setStateError(ERROR.PLAYERNAME_INVALID);
  } else {
    window.location.hash = `#${roomName}[${playerName}]`;
    action(roomName, playerName);
  }
};

const mapStateToProps = _state => {
  const listPlayers = _state.listPlayers;
  const listRooms = _state.listRooms;
  return { listPlayers, listRooms };
};

export const HomeCpt = ({ listPlayers, listRooms, theme, error, actionCreateRoom }) => {
  const [stateError, setStateError] = useState(error);
  const [playerName, setPlayerName] = useState("");
  const [roomName, setRoomName] = useState("");

  console.log(stateError);
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
            <AutoComplete listRooms={listRooms} roomName={roomName} setRoomName={setRoomName} />
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
            onClick={() => buttonCreateRoom(actionCreateRoom, setStateError, roomName, playerName)}
          >
            Start
          </Button>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        key="key-msg"
        open={stateError !== null}
        onClose={() => setStateError(null)}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{stateError}</span>}
      />

      <div className="error-container">{stateError}</div>

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
  mapStateToProps,
  { actionCreateRoom }
)(HomeCpt);

export default Home;
