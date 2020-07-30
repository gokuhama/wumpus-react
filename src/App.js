import React, { Component } from 'react';
import HighScoreList from './components/HighScoreList'
import Cave from "./components/Cave";
import Player from "./components/Player";
import ControlPanel from "./components/ControlPanel";
import GameControl from './scripts/gamecontrol'

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

    this.showHighScores();
    let gameControl = new GameControl(width, height);
    this.state = {
      showHighScores: true,
      scores: [],
      gameControl: gameControl,
    };
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

  updateHighScore() {
    const score = {
      "name": playerNameInput.current.value,
      "score": parseInt(scoreInput.current.value),
      "timestamp": Date.now()
    };
    // make api call
    fetch('http://localhost:8081/setscore', {
      crossDomain: true,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: score })
    })
      .then(res => res.json())
      .then((data) => {
        if (data > -1) {
          alert("Congratulations on a high score! You are #" + (data + 1));
        }
        else {
          alert("Too bad! You didn't get a high score.");
        }
      })
      .catch((error) => { alert(error) });
  }

  showHighScores(init) {
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
          <center><h1>Hunt The Wumpus!</h1></center>
          {this.state.showHighScores && <HighScoreList scores={this.state.scores}></HighScoreList>}
          <div>
            <span>Enter Name:</span>
            <input ref={playerNameInput} type="text" />
            <input ref={scoreInput} type="text" />
            <button onClick={this.updateHighScore}>Start Game</button>
            <button onClick={this.showHighScores}>Show High Scores</button>
            <div>
              <Cave width={width} height={height} gameControl={this.state.gameControl}>
                <Player roomNumber={this.state.gameControl.gameLocations.playerRoomNumber} />
              </Cave>
              <ControlPanel gameControl={this.state.gameControl} onHandlePlayerMove={this.handlePlayerMove} />
            </div>
          </div>
        </header>
      </div>
    );
  }
}


export default App;
