import React, { useState } from "react";
import { connect } from "react-redux";
import eventSocket from "../../common/eventSocket";

export const buttonPlay = (state, optionGames) => {
  console.log("handle click start");
  console.log(optionGames);

  let gameInterval = 1000; // moonMode
  if (optionGames.hardMode) {
    gameInterval = 500;
  }
  if (state.clearInterval === -1) {
    state.socket.emit(eventSocket.START_GAME, gameInterval);
  }
  console.log("handle click end");
};

export const mapStateToProps = _state => {
  const admin = _state.admin;
  return { admin };
};

export const Play = ({ state, admin, optionGames }) => {
  // console.log("STATE PLAYE", state);
  if (admin === true) {
    return (
      <button disabled={state.clearInterval !== -1} onClick={() => buttonPlay(state, optionGames)}>
        Play
      </button>
    );
  }
  return <span />;
};

const PlayButton = connect(mapStateToProps)(Play);

export const Info = ({ state, admin }) => {
  const [hardMode, setHardMode] = useState(false);
  const [moonMode, setMoonMode] = useState(true);
  const [invinvisibilityMode, setInvisibilityMode] = useState(false);
  const [shakeMode, setShakeMode] = useState(false);
  const [spectrumMode, setSpectrumMode] = useState(false);

  // console.log(actionClick);
  return (
    <div className="info">
      {state.winner}
      <form>
        <label>
          Hard mode :
          <input
            name="hardMode"
            type="checkbox"
            checked={hardMode}
            onChange={() => {
              setHardMode(!hardMode);
              setMoonMode(!moonMode);
            }}
          />
          Moon mode :
          <input
            name="moonMode"
            type="checkbox"
            checked={moonMode}
            onChange={() => {
              setMoonMode(!moonMode);
              setHardMode(!hardMode);
            }}
          />
        </label>
        <label>
          Invisibility mode :
          <input
            name="invisibilityMode"
            type="checkbox"
            checked={invinvisibilityMode}
            onChange={() => setInvisibilityMode(!invinvisibilityMode)}
          />
        </label>
        <label>
          Shake mode :
          <input name="shakeMode" type="checkbox" checked={shakeMode} onChange={() => setShakeMode(!shakeMode)} />
        </label>
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
          hardMode: hardMode,
          moonMode: moonMode,
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
