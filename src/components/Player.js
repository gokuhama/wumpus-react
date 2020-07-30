import React from "react"
import '../css/Player.css'

const { min } = Math

const Player = ({ x, y, className }) => {
  return (
    <div className={className} style={{ gridColumn: min(x + 1, 40), gridRow: min(y + 1, 40) }}>    <circle class='player' /></div>
  )
}

export default Player