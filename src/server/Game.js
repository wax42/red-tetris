class Game {
  constructor(players) {
    this.players = players;
    this.optionsGames = {
      invisibility: false
    };
    this.intervallDownPiece = 10;
  }

  checkWhoIsWinner() {
    let playerInGame = this.players.filter(value => value.lose === false);
    if (playerInGame.length === 1) {
      return playerInGame[0].name;
    }
    return null;
  }
}

module.exports = Game;
