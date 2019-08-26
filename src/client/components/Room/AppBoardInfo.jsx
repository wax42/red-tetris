import React, { useState } from "react";
import { connect } from "react-redux";
import eventSocket from "../../../common/eventSocket";
import {
  Button,
  Slider,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
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
        <Checkbox
          checked={spectrumMode}
          onChange={() => setSpectrumMode(!spectrumMode)}
          value={spectrumMode}
        />
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

const ScoreTable = ({ state }) => {
  let listScores = [];

  for (let key in state.listSpectrums) {
    listScores.push({
      name: state.listSpectrums[key].playerName,
      score: state.listSpectrums[key].score,
      nb_win: state.listSpectrums[key].nb_win
    });
  }
  listScores.push({
    name: state.playerName,
    score: state.score,
    nb_win: state.nb_win
  });

  listScores = _.sortBy(listScores, ["score"]);

  listScores = listScores.map((value, index) => ({
    ...value,
    rank: index + 1
  }));

  console.log("Table", listScores, state.listSpectrums);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Score</TableCell>
          <TableCell align="right">Rank</TableCell>
          <TableCell align="right">Number of Win</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listScores.map(row => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.score}</TableCell>
            <TableCell align="right">{row.rank}</TableCell>
            <TableCell align="right">{row.nb_win}</TableCell>
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

const AppBoardInfo = ({ state }) => {
  return (
    <div className="app-board-left">
      <Title />
      <Info state={state} />
      <ScoreTable state={state} />
    </div>
  );
};

export default AppBoardInfo;
