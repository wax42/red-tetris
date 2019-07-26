import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

let roomName = "";
let playerName = "";

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

const OnSubmit = () => {
  console.log("On submit");
  if (playerName.length > 3) return <Link to="/app">Valider</Link>;
  else return <div>error</div>;
};

const Home = () => {
  return (
    <div className="home">
      <div className="home-room">
        <h4>Room Name</h4>
        <input type="text" name="room-name" onChange={e => getRoomName(e)} />
      </div>
      <div className="home-player">
        <h4>Player Name</h4>
        <input
          type="text"
          name="player-name"
          onChange={e => getPlayerName(e)}
        />
      </div>
      <div>
        <OnSubmit />
        {/* <input type="submit" name="" id="" onClick={onSubmit} /> */}
      </div>
    </div>
  );
};

export default Home;
