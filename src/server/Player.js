class Player {
  constructor(name, id) {
    console.log("CLIENT SOCKET CONSTRUCTOR PLAYER - ", id);
    this.score = 0;
    this.name = name;
    this.id = id;

    this.grid = [];
  }
  generateSpectrum() {
    // Take the grid and return a spectrum
  }
}

module.exports = Player;
