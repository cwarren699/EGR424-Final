const express = require('express');
const http = require('http')
const bodyParser = require('body-parser')
const DeckEncoder = require('./runeterra-master/src/DeckEncoder')
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const DOMParser = require('xmldom').DOMParser;
let fs = require('fs');
global.fetch = require("node-fetch");

const app = express();

app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

let opponent_deck = []
let your_deck = []

app.listen(5000, () => {
  console.log("listening on port 5000");
  console.log("http://localhost:5000/");
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/about')
});

app.get('/about', (req, res) => {
  res.render('about.html');
});

app.get('/application', (req, res) => {
  res.render('application.html', { opponent_arr: opponent_deck, your_arr: your_deck });
});

app.post('/application', function (req, res) {
  if (req.body.opponent_code !== undefined) {
    opponent_deck = []
    try {
      DeckEncoder.decode(req.body.opponent_code).forEach(card => {
        opponent_deck.push(['http://lolg-cdn.porofessor.gg/img/lor/cards/' + card.code + '_en_350.webp?v=18744', card.count])
      });
    } catch (err) {
      console.error("Opponent deck code is invalid")
    }
    res.render('application.html', { opponent_arr: opponent_deck, your_arr: your_deck });
  } else if (req.body.your_code !== undefined) {
    your_deck = []
    try {
      DeckEncoder.decode(req.body.your_code).forEach(card => {
        your_deck.push(['http://lolg-cdn.porofessor.gg/img/lor/cards/' + card.code + '_en_350.webp?v=18744', card.count])
      });
    } catch (err) {
      console.error("Opponent deck code is invalid")
    }
    res.render('application.html', { opponent_arr: opponent_deck, your_arr: your_deck });
  }
});