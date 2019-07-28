import React from "react";
import { withRouter } from "react-router-dom";
import { FaHome, FaIdBadge } from "react-icons/fa";

let roomName = "";
let playerName = "";
let url = "";

//TODO validation
function getRoomName(event) {
  console.log("test player name");
  roomName = event.target.value;
  console.log(roomName);
}

function getPlayerName(event) {
  console.log("test player name");
  playerName = event.target.value;
  console.log(playerName);
}
// return <Redirect to='/dashboard' />

const onSubmit = history => {
  /* console.log("On submit");
  if (playerName.length > 3) return <Link to="/app">Valider</Link>;
  else return <div>error</div>; */
  console.log(roomName);
  console.log(playerName);
  if (roomName.length < 3 || playerName.length < 3) console.error("name < 3 ");
  else history.push(`/#${roomName}[${playerName}]`);
};

const Button = withRouter(({ history }) => (
  <button
    className="home-btn"
    type="button"
    onClick={() => {
      onSubmit(history);
    }}
  >
    Join the room
  </button>
));

const Home = () => {
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
        <Button />
      </div>
    </div>
  );
};

export default Home;
