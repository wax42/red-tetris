import React, { useState } from "react";
import { connect } from "react-redux";
import eventSocket from "../../common/eventSocket";
import { Button, Slider, Checkbox } from "@material-ui/core";

export const buttonPlay = (state, optionGames) => {
  console.log("handle click start");
  console.log(optionGames);

  if (state.clearInterval === -1) {
    state.socket.emit(eventSocket.START_GAME, optionGames);
  }
  console.log("handle click end");
};

export const mapStateToProps = _state => {
  const admin = _state.admin;
  return { admin };
};

export const Play = ({ state, admin, optionGames }) => {
  if (admin === true) {
    return (
      <Button disabled={state.game} onClick={() => buttonPlay(state, optionGames)}>
        Play
      </Button>
    );
  }
  return <span />;
};

const PlayButton = connect(mapStateToProps)(Play);

export const Info = ({ state, admin }) => {
  const [gameInterval, setgameInterval] = useState(700);
  const [invisibilityMode, setInvisibilityMode] = useState(false);
  const [shakeMode, setShakeMode] = useState(false);
  const [spectrumMode, setSpectrumMode] = useState(false);

  return (
    <div className="info">
      {state.winner}
      hardMode
      <Slider
        value={gameInterval}
        onChange={(event, value) => {
          setgameInterval(value);
        }}
        min={100}
        max={1500}
        step={10}
        aria-labelledby="continuous-slider"
        valueLabelDisplay="auto"
      />
      MoonMode Invisibility mode :
      <Checkbox
        checked={invisibilityMode}
        onChange={() => setInvisibilityMode(!invisibilityMode)}
        value={invisibilityMode}
      />
      Shake mode :
      <Checkbox checked={shakeMode} onChange={() => setShakeMode(!shakeMode)} value={shakeMode} />
      With Spectrum mode:
      <Checkbox checked={spectrumMode} onChange={() => setSpectrumMode(!spectrumMode)} value={spectrumMode} />
      <PlayButton
        state={state}
        admin={admin}
        optionGames={{
          gameInterval: gameInterval,
          invisibilityMode: invisibilityMode,
          shakeMode: shakeMode,
          spectrumMode: spectrumMode
        }}
      />
    </div>
  );
};

export const Title = () => {
  return <div className="title">Red Tetris</div>;
};

const AppBoardInfo = ({ state }) => {
  return (
    <div className="app-board-left">
      <Title />
      <Info state={state} />
    </div>
  );
};

export default AppBoardInfo;
