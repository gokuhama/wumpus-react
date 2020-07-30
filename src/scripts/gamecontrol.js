import CaveGenerator from './cavegenerator'
import Player from './player'
import GameLocations from './gamelocations'
import TriviaManagement from './triviamanagement'

//
// this is the game control object
//
class GameControl {

    constructor(width, height) {
        this._caveGenerator = new CaveGenerator(width, height);
        this._player = new Player();
        this._gameLocations = new GameLocations();
        this._triviaManagement = new TriviaManagement();
        this._goldCoinsLeft = 100;
        this._statusText = "welcome to wumpus!";
        this._connectedRooms = this.getConnectedRooms(0);
    }

    get caveGenerator() {
        return this._caveGenerator;
    }
    get player() {
        return this._player;
    }

    get gameLocations() {
        return this._gameLocations;
    }

    movePlayerToRoom(newRoomNumber) {
        // update the game locations
        this._gameLocations.playerRoomNumber = newRoomNumber;
        this._connectedRooms = this.getConnectedRooms(newRoomNumber);
        // this means they took a turn !
        this.player.numberOfTurns += 1;
        // each turn they get a gold coin, up to 100 coins
        if (this._goldCoinsLeft > 0) {
            this._player.goldCoins += 1;
            this._goldCoinsLeft -= 1;
        }
        // update a new piece of random trivia!
        this._statusText = this._triviaManagement.randomTriviaAnswer;
    }

    getConnectedRooms(roomNumber) {
        return this.caveGenerator.getConnectedRooms(roomNumber);
    }

    get triviaManagement() {
        return this._triviaManagement;
    }

    get statusText() {
        return this._statusText;
    }

    get connectedRooms(){
        return this._connectedRooms;
    }
}

export default GameControl