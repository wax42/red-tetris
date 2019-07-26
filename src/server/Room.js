import Game from './Game.js';
import Player from './Player.js';


export default class Room {
    constructor(name, admin) {
        this.name = name;
        this.admin = admin; // hash / id
        // TODO add the admin in the lists of players
        this.game = null;
        this.players = [];
        // top score
    }

    newGame() {
        this.game = new Game(this.players);
    }
    addPlayer(name, id) {
        let newPlayer = new Player(name, id);
        this.players.push(newPlayer);
    }

}