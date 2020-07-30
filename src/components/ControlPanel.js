import React, { Component } from 'react';
import '../css/ControlPanel.css'

class ControlPanel extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "width": this.props.width,
      "height": this.props.height,
      "gamecontrol": this.props.gamecontrol,
    }
  }

  render() {
    return (
      <div className="controlpanel">
        <div>
          <div>
            <button className="direction-button up-left" />
            <button className="direction-button up" />
            <button className="direction-button up-right" />
          </div>
          <div>
            <button className="direction-button down-left" />
            <button className="direction-button down" />
            <button className="direction-button down-right" />
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel