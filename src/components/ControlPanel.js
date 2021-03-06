import React, { Component } from 'react';
import '../css/ControlPanel.css'

class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "width": this.props.width,
      "height": this.props.height,
      "gameControl": this.props.gameControl,
    }

    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  handlePlayerMove(room) {
    this.props.onHandlePlayerMove(room);
  }

  render() {
    const connectedRooms = this.state.gameControl.connectedRooms;
    return (
      <div className="controlpanel">
        <div>
          <div>
            <button className="direction-button up-left" onClick={() => this.handlePlayerMove(connectedRooms.upLeft)}>{connectedRooms.upLeft}</button>
            <button className="direction-button up" onClick={() => this.handlePlayerMove(connectedRooms.up)}>{connectedRooms.up}</button>
            <button className="direction-button up-right" onClick={() => this.handlePlayerMove(connectedRooms.upRight)}>{connectedRooms.upRight}</button>
          </div>
          <div>
            <button className="direction-button down-left" onClick={() => this.handlePlayerMove(connectedRooms.downLeft)}>{connectedRooms.downLeft}</button>
            <button className="direction-button down" onClick={() => this.handlePlayerMove(connectedRooms.down)}>{connectedRooms.down}</button>
            <button className="direction-button down-right" onClick={() => this.handlePlayerMove(connectedRooms.downRight)}>{connectedRooms.downRight}</button>
          </div>
        </div>
        <div>
          <div>
            <span>Coins:</span>
            <span>{this.state.gameControl.player.goldCoins}</span>
          </div>
          <div>
            <span>Arrows:</span>
            <span>{this.state.gameControl.player.arrowCount}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel