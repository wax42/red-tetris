import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import eventSocket from "../../../common/eventSocket";
import { useDispatch } from "react-redux";
import { actionCleanRoomName } from "../../actions/actionsRedux";
import { FaDoorOpen, FaEye } from "react-icons/fa";
import {
  Button,
  Slider,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  makeStyles,
  Grid,
  FormControlLabel
} from "@material-ui/core";
import _ from "lodash";

const useStyles = makeStyles({
  root: {
    color: "#000"
  }
});

export const buttonPlay = (state, optionGames) => {
  if (state.clearInterval === -1) {
    state.socket.emit(eventSocket.START_GAME, optionGames);
  }
};

export const mapStateToProps = _state => {
  const admin = _state.admin;
  return { admin };
};

export const leaveRoom = (state, dispatch) => {
  dispatch(actionCleanRoomName());
  state.socket.emit(eventSocket.LEAVE_ROOM);
  window.location.hash = "";
};

export const Play = ({ state, admin }) => {
  const [gameInterval, setgameInterval] = useState(700);
  const [invisibilityMode, setInvisibilityMode] = useState(false);
  const [shakeMode, setShakeMode] = useState(false);
  const [spectrumMode, setSpectrumMode] = useState(false);

  const classes = useStyles();
  if (admin === false) {
    return null;
  }
  return (
    <div className="info">
      <div>
        <Grid container spacing={2}>
          <Grid item>Hard mode</Grid>
          <Grid item xs>
            <Slider
              disabled={state.game}
              classes={{ root: classes.root }}
              value={gameInterval}
              onChange={(event, value) => {
                setgameInterval(value);
              }}
              min={100}
              max={1500}
              step={100}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              marks={true}
            />
          </Grid>
          <Grid item>Moon mode</Grid>
        </Grid>
        <FormControlLabel
          control={
            <Checkbox
              checked={invisibilityMode}
              onChange={() => setInvisibilityMode(!invisibilityMode)}
              value={invisibilityMode}
            />
          }
          label="Invisibility mode"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={shakeMode}
              onChange={() => {
                setShakeMode(!shakeMode);
              }}
              value={shakeMode}
            />
          }
          label="Shake mode"
        />
        <FormControlLabel
          control={<Checkbox checked={spectrumMode} onChange={() => setSpectrumMode(!spectrumMode)} value={spectrumMode} />}
          label="Spectrum mode"
        />
      </div>
      <Button
        className="btn-play"
        disabled={state.game}
        variant="outlined"
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
};

export const StyleSpectator = ({ spectator }) => {
  if (spectator === true) {
    return <FaEye />;
  }
  return null;
};

export const ScoreTable = ({ state, spectator }) => {
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
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell onClick={() => setSort(["name"])}> Name </TableCell>
          <TableCell align="center" onClick={() => setSort(["score"])}>
            Score
          </TableCell>
          <TableCell align="center" onClick={() => setSort(["spectator"])}>
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
            <TableCell align="center">{row.score}</TableCell>
            <TableCell align="center">
              <StyleSpectator spectator={row.spectator} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const Info = ({ state, admin }) => {
  const [win, setWin] = useState(null);

  useEffect(() => {
    if (state.winner !== null) {
      setWin(<div className="title-winner">Winner is {state.winner}</div>);
    } else {
      setWin(null);
    }
  }, [state.winner]);

  if (admin !== false || win !== null)
    return (
      <div className="info-container">
        <Play admin={admin} state={state} />
        <div style={{ padding: "10px 0px" }}>{win}</div>
      </div>
    );
  return null;
};

const Admin = connect(mapStateToProps)(Info);

export const Title = () => {
  return <div className="title">Red Tetris</div>;
};

const AppBoardInfo = ({ state, spectator }) => {
  const dispatch = useDispatch();

  return (
    <div className="app-board-left">
      <div className="title-container">
        <Button color="secondary" onClick={() => leaveRoom(state, dispatch)}>
          <FaDoorOpen className="leave-button" />
        </Button>
        <Title />
      </div>
      <Admin state={state} />
      <ScoreTable state={state} spectator={spectator} />
    </div>
  );
};

export default AppBoardInfo;
