var express = require('express');
var app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
var fs = require("fs");
const ScoreKeeper = require('./scorekeeper');

const scoreKeeper = new ScoreKeeper();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/gethighscores', function (req, res) {
    let scores = scoreKeeper.loadScores();
    res.end(JSON.stringify(scores));
})

app.post('/setscore', function(req, res){
    console.log(req.body);
    let rank = scoreKeeper.updateHighScore(req.body.player);
    res.end(JSON.stringify(rank));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})