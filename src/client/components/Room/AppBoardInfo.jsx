import React, { useState } from "react";
import { connect } from "react-redux";
import eventSocket from "../../../common/eventSocket";
import { Button, Slider, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import _ from "lodash";

export const buttonPlay = (state, optionGames) => {
  if (state.clearInterval === -1) {
    state.socket.emit(eventSocket.START_GAME, optionGames);
  }
};

export const mapStateToProps = _state => {
  const admin = _state.admin;
  return { admin };
};

export const Play = ({ state, admin }) => {
  const [gameInterval, setgameInterval] = useState(700);
  const [invisibilityMode, setInvisibilityMode] = useState(false);
  const [shakeMode, setShakeMode] = useState(false);
  const [spectrumMode, setSpectrumMode] = useState(false);

  if (admin === true) {
    return (
      <div>
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
        <Checkbox
          checked={shakeMode}
          onChange={() => {
            setShakeMode(!shakeMode);
          }}
          value={shakeMode}
        />
        With Spectrum mode:
        <Checkbox checked={spectrumMode} onChange={() => setSpectrumMode(!spectrumMode)} value={spectrumMode} />
        <Button
          disabled={state.game}
          onClick={() =>
            buttonPlay(state, {
              gameInterval: gameInterval,
              invisibilityMode: invisibilityMode,
              shakeMode: shakeMode,
              spectrumMode: spectrumMode
            })
          }
        >
          Play
        </Button>
      </div>
    );
  }
  return <span />;
};

const StyleSpectator = ({ spectator }) => {
  console.log(spectator);
  if (spectator === true) {
    return <div>S</div>;
  }
  return null;
};

const ScoreTable = ({ state, spectator }) => {
  const [sort, setSort] = useState(["score"]);
  let listScores = [];

  if (_.isEmpty(state.listSpectrums) === false) {
    for (let key in state.listSpectrums) {
      listScores.push({
        name: state.listSpectrums[key].playerName,
        score: state.listSpectrums[key].score,
        nb_win: state.listSpectrums[key].nb_win,
        spectator: state.listSpectrums[key].spectator
      });
    }
  }

  listScores.push({
    name: state.playerName,
    score: state.score,
    nb_win: state.nb_win,
    spectator: spectator
  });

  listScores = _.sortBy(listScores, sort);
  if (sort !== ["name"]) {
    listScores = _.reverse(listScores);
  }
  console.log("appboard", JSON.stringify(listScores));
  console.log("spectre", JSON.stringify(state.listSpectrums));

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell onClick={() => setSort(["name"])}> Name </TableCell>
          <TableCell align="right" onClick={() => setSort(["score"])}>
            Score
          </TableCell>
          <TableCell align="right" onClick={() => setSort(["nb_win"])}>
            Number of Win
          </TableCell>
          <TableCell align="right" onClick={() => setSort(["spectator"])}>
            Spectator
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listScores.map(row => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.score}</TableCell>
            <TableCell align="right">{row.nb_win}</TableCell>
            <TableCell align="right">
              <StyleSpectator spectator={row.spectator} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Admin = connect(mapStateToProps)(Play);

export const Info = ({ state, admin }) => {
  return (
    <div className="info">
      {state.winner}
      <Admin state={state} admin={admin} />
      Score Table
    </div>
  );
};

export const Title = () => {
  return <div className="title">Red Tetris</div>;
};

const AppBoardInfo = ({ state, spectator }) => {
  return (
    <div className="app-board-left">
      <Title />
      <Info state={state} />
      <ScoreTable state={state} spectator={spectator} />
    </div>
  );
};

export default AppBoardInfo;
