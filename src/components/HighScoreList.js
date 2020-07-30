import React from 'react'
import '../css/HighScoreList.css'

const HighScoreList = ({ scores }) => {
    return (
        <div className="list">
            <center><h3>High Scores</h3></center>
            {scores.map((player, index) => (
                <div key={index} className="list-row">
                    <p className="row-rank">#{index + 1}</p>
                    <p className="row-name">{player.name}</p>
                    <p className="row-score">{player.score}</p>
                </div>
            ))}
        </div>
    )
};

export default HighScoreList