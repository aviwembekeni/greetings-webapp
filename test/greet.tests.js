"use strict"
let assert = require("assert");
var Greet = require("../greet");

const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
  connectionString: 'postgresql://lavish:lavish@localhost:5432/greets'
})

describe('greet', function() {

  beforeEach(async function() {
     await pool.query('DELETE FROM users;');
  })

    it('should return the greeting in English', async function() {
      var greet = Greet(pool);

      assert.deepEqual("Hello, Jon", await greet.greetNeighbour("english", "Jon"));
    });

    it('should return the greeting in Afrikaans', async function() {
      var greet = Greet(pool);

      assert.deepEqual("Hallo, Jon", await greet.greetNeighbour("afrikaans", "Jon"));
    });

    it('should return the greeting in IsiXhosa', async function() {
      var greet = Greet(pool);

      assert.deepEqual("Molo, Jon", await greet.greetNeighbour("isixhosa", "Jon"));
    });

    it('should return the counter value of people counted', async function() {
      var greet = Greet(pool);

      await greet.greetNeighbour("English", "Jon")
      await greet.greetNeighbour("Afrikaans", "Aviwe")
      await greet.greetNeighbour("isixhosa", "Doe")

      assert.deepEqual(3, await greet.checkGreets());
    });

    it('should return number of different names greeted', async function() {
      var greet = Greet(pool);

      await greet.greetNeighbour("English", "Jon")
      await greet.greetNeighbour("isixhosa", "Aviwe")
      await greet.greetNeighbour("isixhosa", "Jon")

      assert.deepEqual(2, await greet.checkGreets());
    });

    it('should return object of different names greeted with number of greets per each person', async function() {
      var greet = Greet(pool);

      await greet.greetNeighbour("English", "Jon")
      await greet.greetNeighbour("isixhosa", "Aviwe")
      await greet.greetNeighbour("isixhosa", "Jon")


      assert.deepEqual([ { name: 'Aviwe' }, { name: 'Jon' } ], await greet.getGreetedNames());
    });

    it('should return number of greetings for a user', async function() {
      var greet = Greet(pool);

      await greet.greetNeighbour("English", "Jon")
      await greet.greetNeighbour("isixhosa", "Aviwe")
      await greet.greetNeighbour("isixhosa", "Jon")


      assert.deepEqual(2, await greet.getGreetsForUser("Jon"));
    });

    it('should return empty users data', async function() {
      var greet = Greet(pool);

      await greet.greetNeighbour("English", "Jon")
      await greet.greetNeighbour("isixhosa", "Aviwe")
      await greet.greetNeighbour("isixhosa", "Jon")


      assert.deepEqual([], await greet.reset());
    });

    after(async function() {
      await pool.end();
    })
});


