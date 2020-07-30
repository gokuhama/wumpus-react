import React, { Component } from 'react';
import Room from './Room';
import CaveGenerator from '../scripts/cavegenerator'
import '../css/Cave.css'

class Cave extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "width": this.props.width,
      "height": this.props.height,
      "gamecontrol": this.props.gamecontrol,
    }

    this.cave = new CaveGenerator(this.state.width, this.state.height);
    this.roomRows = this.cave.createRooms();
  }

  render() {
    const gameLocations = this.state.gamecontrol.gameLocations;
    return (
      <div className="cave">
        {this.roomRows.map(roomRow => (
          <div key={roomRow.id}>
            {roomRow.rooms.map(room => (
              <Room key={room.id} model={room} class={room.isEven() ? 'room-even' : 'room-odd'}>
                {room.id === gameLocations.playerRoomNumber ? this.props.children : null}
              </Room>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Cave