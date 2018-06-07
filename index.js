const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const Greet = require("./greet");
const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
  connectionString: 'postgresql://lavish:lavish@localhost:5432/greets'
});

const greet = Greet(pool);

const app = express();

let PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs(
  {defaultLayout: 'main',

 }));

app.set('view engine', 'handlebars');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(express.static('public'));

app.get('/', async function(req, res){

  let counter = await greet.checkGreets();
  res.render("greetings", {counter});

});

app.get('/reset', async function(req, res){

  await greet.reset();
  let counter = await greet.checkGreets();
  res.render("greetings", {counter});

});


app.get('/greetings/:user/:language', async function(req, res){

  let name = req.params.user;
  let language = req.params.language;

  let greetingMessage = await greet.greetNeighbour(language, name);
  let counter = await greet.checkGreets();

  res.render("greetings", {greetingMessage, counter});

});

app.post('/greetings', async function(req, res){

  let name = req.body.name;
  let language = req.body.language;

  let greetingMessage = await greet.greetNeighbour(language, name);
  let counter = await greet.checkGreets();

  res.render("greetings", {greetingMessage, counter});

});

app.get('/greeted', async function(req, res, next){

  try {
    let results = await pool.query('select * from users');
    let greetedNames = results.rows;

    res.render("greeted", {greetedNames});
  } catch (err) {
    return next(err);
  }

  //let greetedNames = greet.getGreetedNames();
});

app.get('/greeted/:name', async function(req, res){

  let name = req.params.name;

  let greetedNames = await greet.getGreetedNames();
  let counter = await greet.getGreetsForUser(name);
  let message = `Hello, ${name} has been greeted ${counter} time(s).`;

  res.render("greeted", {greetedNames, message});

});

process.on('uncaughtException', function (err) {
  console.log(err);
}); 

app.listen(PORT, function(){
  console.log('App starting on port', PORT)
})
