import React from "react"
import '../css/Player.css'

const Player = ({ roomNumber, className }) => {
  return (
    <div className='player'>
      <span>{roomNumber}</span>
    </div>
  )
}

export default Player