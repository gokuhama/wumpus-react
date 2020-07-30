//
// this is the trivia managment object
//
class TriviaManagement {

    get randomTriviaAnswer() {
        return "trivia answer #" + Math.floor((Math.random() * 100)+1).toString();
    }
}

export default TriviaManagement