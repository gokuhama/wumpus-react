import React, { Component } from 'react';
import HighScoreList from './components/HighScoreList'
import Cave from "./components/Cave";
import Player from "./components/Player";

class TextInput extends React.Component {
  render() {
    return (
      <input
        type="text"
        value={this.props.text} />
    )
  }
}

var playerNameInput = React.createRef();
var scoreInput = React.createRef();

class App extends Component {

  constructor() {
    super();

    this.showHighScores();
    this.state = {
      showHighScores: true,
      scores: []
    };

    this.showHighScores = this.showHighScores.bind(this);
    this.updateHighScore = this.updateHighScore.bind(this);
  }

  componentDidMount(){
    this._isMounted = true;
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  updateHighScore() {
    const score = {
      "name": playerNameInput.current.value,
      "score": scoreInput.current.value,
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
        alert("You received a rank of " + data)
      })
      .catch((error) => { alert(error) });
    // const rank = 1;
    // if (rank > -1) {
    //   alert("Congratulations on a high score! You are #" + rank);
    // }
    // else {
    //   alert("Too bad! You didn't get a high score.");
    // }
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <center><h1>Hunt The Wumpus!</h1></center>
          {this.state.showHighScores && <HighScoreList scores={this.state.scores}></HighScoreList>}
          <div>
            <span>Enter Name:</span><input ref={playerNameInput} type="text" /><input ref={scoreInput} type="text" />
            <button onClick={this.updateHighScore}>Start Game</button>
            <button onClick={this.showHighScores}>Show High Scores</button>
            <Cave width={6} height={5}>
              <Player x={0} y={0} />
            </Cave>
          </div>
        </header>
      </div>
    );
  }
}


export default App;
