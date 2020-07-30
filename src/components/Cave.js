import React, { Component } from 'react';
import Room from './Room';
import '../css/Cave.css'

class Cave extends Component {

  constructor(props) {
    super(props);

    this.state = {
      "width": this.props.width,
      "height": this.props.height,
      "gameControl": this.props.gameControl,
    }

    this.roomRows = this.state.gameControl.caveGenerator.createRooms();
  }

  render() {
    const gameLocations = this.state.gameControl.gameLocations;
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