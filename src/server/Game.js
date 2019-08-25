class Game {
  constructor(players, optionsGames) {
    this.players = players;
    this.optionsGames = {
      invisibility: optionsGames.invisibilityMode,
      spectrum: optionsGames.spectrumMode
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