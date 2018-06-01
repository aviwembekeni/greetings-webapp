const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const Greet = require("./greet");

var greet = Greet();

const app = express();

let PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs(
  {defaultLayout: 'main',

 }));

app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.static('public'));

app.get('/', function(req, res){

  let counter = greet.checkGreets();
  res.render("greetings", {counter});

});


app.get('/greetings/:user/:language', function(req, res){

  let name = req.params.user;
  let language = req.params.language;

  let greetingMessage = greet.greetNeighbour(language, name);
  let counter = greet.checkGreets();

  res.render("greetings", {greetingMessage, counter});

});

app.post('/greetings', function(req, res){

  let name = req.body.name;
  let language = req.body.language;

  let greetingMessage = greet.greetNeighbour(language, name);
  let counter = greet.checkGreets();

  res.render("greetings", {greetingMessage, counter});

});

app.get('/greeted', function(req, res){

  let greetedNames = greet.getGreetedNames();

  res.render("greeted", {greetedNames});

});

app.get('/greeted/:name', function(req, res){

  let name = req.params.name;

  let greetedNames = greet.getGreetedNames();
  let counter = greetedNames[name];

  let message = `Hello, ${name} has been greeted ${counter} time(s).`;

  res.render("greeted", {greetedNames, message});

});

app.listen(PORT, function(){
  console.log('App starting on port', PORT)
})
