import React, { Component } from 'react';
import HighScoreList from './components/HighScoreList'
import Cave from "./components/Cave";
import Player from "./components/Player";
import ControlPanel from "./components/ControlPanel";
import GameControl from './scripts/gamecontrol'
import './App.css'

var playerNameInput = React.createRef();
var scoreInput = React.createRef();

const width = 6;
const height = 5;

const keycodes = {
  NUM1: 97,
  NUM2: 98,
  NUM3: 99,
  NUM4: 100,
  NUM5: 101,
  NUM6: 102
}

class App extends Component {

  constructor() {
    super();

    let gameControl = new GameControl(width, height);
    this.state = {
      gameStarted: false,
      showHighScores: false,
      showEndGame: false,
      scores: [],
      gameControl: gameControl,
    };
    this.startGame = this.startGame.bind(this);
    this.showHighScores = this.showHighScores.bind(this);
    this.updateHighScore = this.updateHighScore.bind(this);
    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  _handleKeyDown = (event) => {
    const connectedRooms = this.state.gameControl.connectedRooms;
    switch (event.keyCode) {
      case keycodes.NUM1:
        this.handlePlayerMove(connectedRooms.downLeft);
        break;
      case keycodes.NUM2:
        this.handlePlayerMove(connectedRooms.down);
        break;
      case keycodes.NUM3:
        this.handlePlayerMove(connectedRooms.downRight);
        break;
      case keycodes.NUM4:
        this.handlePlayerMove(connectedRooms.upLeft);
        break;
      case keycodes.NUM5:
        this.handlePlayerMove(connectedRooms.up);
        break;
      case keycodes.NUM6:
        this.handlePlayerMove(connectedRooms.upRight);
        break;
      default:
        break;
    }
  }

  startGame() {
    if (!this.state.gameStarted) {
      this.state.gameControl.reset();
      this.setState({ "gameStarted": true, "showEndGame": false });
    }
    else {
      const score = this.state.gameControl.player.GetCurrentScore();
      let message = "Your score was " + score + ". ";
      this.updateHighScore(playerNameInput.current.value, score)
        .then((data) => {
          if (data > -1) {
            message += "Congratulations on a high score! You are #" + (data + 1);
          }
          else {
            message += "Too bad! You didn't get a high score.";
          }
          this.setState({ "gameStarted": false, "showEndGame": true, "endGameMessage": message });
        });
    }
  }

  updateHighScore(playerName, playerScore) {
    const score = {
      "name": playerName,
      "score": playerScore,
      "timestamp": Date.now()
    };
    // make api call
    return fetch('http://localhost:8081/setscore', {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: score })
    })
      .then(res => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => { alert(error) });
  }

  showHighScores(init) {
    if (!this.state.showHighScores) {
      // make api call
      const self = this;
      fetch('http://localhost:8081/gethighscores', {
        crossDomain: true,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => res.json())
        .then((data) => {
          if (self._isMounted) {
            self.setState({ showHighScores: true, scores: data });
          }
        })
        .catch((error) => { console.log(error) });
    }
    else {
      this.state.showHighScores = false;
      this.setState({ scores: [] });
    }
  }

  handlePlayerMove(room) {
    this.state.gameControl.movePlayerToRoom(room);
    this.setState({
      gameControl: this.state.gameControl,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <center><h1 className="title">Hunt The Wumpus!</h1></center>
          <div>
            <div>
              <span className="title">Enter Name:</span>
              <input ref={playerNameInput} type="text" />
            </div>
            <div>
              <button className="startButton" onClick={this.startGame}>{this.state.gameStarted ? "End" : "Start"} Game</button>
            </div>
            {this.state.showEndGame && <span className="title">{this.state.endGameMessage}</span>}
            <div>
              <Cave width={width} height={height} gameControl={this.state.gameControl}>
                {this.state.gameStarted && <Player roomNumber={this.state.gameControl.gameLocations.playerRoomNumber} />}
              </Cave>
              {this.state.gameStarted && <ControlPanel gameControl={this.state.gameControl} onHandlePlayerMove={this.handlePlayerMove} />}
            </div>
          </div>
          <button className="highScoreButton" onClick={this.showHighScores}>{this.state.showHighScores ? "Hide" : "Show"} High Scores</button>
          {this.state.showHighScores && <HighScoreList scores={this.state.scores}></HighScoreList>}
        </header>
      </div>
    );
  }
}

export default App;
