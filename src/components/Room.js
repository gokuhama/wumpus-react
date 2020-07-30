import React, { Component } from 'react';
import '../css/Room.css'

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "width": this.props.width,
      "height": this.props.height
    }

    this.class = this.props.class
    this.model = this.props.model
  }

  render() {
    return (
      // <div class="hexagon hexagon1"><div class="hexagon-in1"><div class="hexagon-in2"></div></div></div>
      <div className={this.class}>
        <span>{this.model.id}</span>
        {this.props.children}
      </div>
    );
  }
}

export default Room