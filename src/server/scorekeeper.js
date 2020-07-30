const fs = require('fs');

const MAX_HIGHSCORE_COUNT = 10;
const SCORE_PATH = 'highscores.json';

module.exports = class ScoreKeeper{
    loadScores(){
        const data = fs.readFileSync(SCORE_PATH, 'utf-8');

        // parse JSON object
        return JSON.parse(data.toString());
    }

    saveScores(highscores){
        const data = JSON.stringify(highscores, null, 4);

        fs.writeFileSync(SCORE_PATH, data);
        console.log("JSON data is saved.");
    }

    updateHighScore(newscore){
        const scores = this.loadScores();
        if (!scores) {
            scores = [];
        }
    
        let position = -1;
        let changed = false;
        if (scores.length > 0) {
            // can optimize by starting from lowest score
            for (let i = 0; i < scores.length; i++) {
                if (scores[i].score < newscore.score) {
                    scores.splice(i, 0, newscore);
                    if (scores.length > MAX_HIGHSCORE_COUNT) {
                        scores.pop();
                    }
                    changed = true;
                    position = i;
                    break;
                }
            }
        }
        else {
            scores.push(newscore);
            changed = true;
            position = 0;
        }
    
        if (changed) {
            console.log("Updating high scores!");
            this.saveScores(scores);
        }
        else {
            console.log("No new high score.");
        }
    
        return position;
    }
}
