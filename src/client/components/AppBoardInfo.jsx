import React, { useState } from "react";
import { connect } from "react-redux";
import eventSocket from "../../common/eventSocket";

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
      <button
        disabled={state.game}
        onClick={() => buttonPlay(state, optionGames)}
      >
        Play
      </button>
    );
  }
  return <span />;
};

const PlayButton = connect(mapStateToProps)(Play);

export const Info = ({ state, admin }) => {
  const [gameInterval, setgameInterval] = useState(7);
  const [invinvisibilityMode, setInvisibilityMode] = useState(false);
  const [shakeMode, setShakeMode] = useState(false);
  const [spectrumMode, setSpectrumMode] = useState(false);

  return (
    <div className="info">
      {state.winner}
      <form>
        <label>
          hardMode
          <input
            id="typeinp"
            type="range"
            min="100"
            max="1500"
            value={gameInterval}
            onChange={event => {
              setgameInterval(event.target.value);
            }}
            step="1"
          />
          MoonMode
        </label>
        <br />
        <label>
          Invisibility mode :
          <input
            name="invisibilityMode"
            type="checkbox"
            checked={invinvisibilityMode}
            onChange={() => setInvisibilityMode(!invinvisibilityMode)}
          />
        </label>
        <br />

        <label>
          Shake mode :
          <input
            name="shakeMode"
            type="checkbox"
            checked={shakeMode}
            onChange={() => setShakeMode(!shakeMode)}
          />
        </label>
        <br />

        <label>
          With Spectrum mode:
          <input
            name="spectrumMode"
            type="checkbox"
            checked={spectrumMode}
            onChange={() => setSpectrumMode(!spectrumMode)}
          />
        </label>
      </form>
      <PlayButton
        state={state}
        admin={admin}
        optionGames={{
          gameInterval: gameInterval,
          invinvisibilityMode: invinvisibilityMode,
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
