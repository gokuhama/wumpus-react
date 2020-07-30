import React, { Component } from 'react';
import '../css/ControlPanel.css'

const directions = {
  UP_LEFT: 'upleft',
  UP: 'up',
  UP_RIGHT: 'upright',
  DOWN_LEFT: 'downleft',
  DOWN_RIGHT: 'downright',
  DOWN: 'down',
  DOWN_RIGHT: 'downright'
}

class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "width": this.props.width,
      "height": this.props.height,
      "gamecontrol": this.props.gamecontrol,
    }

    this.handlePlayerMove = this.handlePlayerMove.bind(this);
  }

  handlePlayerMove(direction) {
    this.props.onHandlePlayerMove(4);
  }

  render() {
    return (
      <div className="controlpanel">
        <div>
          <div>
            <button className="direction-button up-left" onClick={() => this.handlePlayerMove(directions.UP_LEFT)} />
            <button className="direction-button up" onClick={() => this.handlePlayerMove(directions.UP)} />
            <button className="direction-button up-right" onClick={() => this.handlePlayerMove(directions.UP_RIGHT)} />
          </div>
          <div>
            <button className="direction-button down-left" onClick={() => this.handlePlayerMove(directions.DOWN_LEFT)} />
            <button className="direction-button down" onClick={() => this.handlePlayerMove(directions.DOWN)} />
            <button className="direction-button down-right" onClick={() => this.handlePlayerMove(directions.DOWN_RIGHT)} />
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel