import React, { Component } from 'react';
import HighScoreList from './components/HighScoreList'
import Cave from "./components/Cave";
import Player from "./components/Player";
import ControlPanel from "./components/ControlPanel";
import GameControl from './scripts/gamecontrol'

var playerNameInput = React.createRef();
var scoreInput = React.createRef();

class App extends Component {

  constructor() {
    super();

    this.showHighScores();
    this.state = {
      showHighScores: true,
      scores: [],
      gamecontrol: new GameControl()
    };

    this.showHighScores = this.showHighScores.bind(this);
    this.updateHighScore = this.updateHighScore.bind(this);
    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  handlePlayerMove(room){
    this.state.gamecontrol.movePlayerToRoom(room);
    this.setState({
      gamecontrol: this.state.gamecontrol
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
              <Cave width={6} height={5} gamecontrol={this.state.gamecontrol}>
                <Player roomNumber={this.state.gamecontrol.gameLocations.playerRoomNumber} />
              </Cave>
              <ControlPanel gamecontrol={this.state.gamecontrol} onHandlePlayerMove={this.handlePlayerMove} />
            </div>
          </div>
        </header>
      </div>
    );
  }
}


export default App;
