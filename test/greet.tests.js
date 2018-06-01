let assert = require("assert");
var Greet = require("../greet");

describe('greet', function() {

    it('should return the greeting in English', function() {
      var greet = Greet();

      assert.deepEqual("Hello, Jon", greet.greetNeighbour("english", "Jon"));
    });

    it('should return the greeting in Afrikaans', function() {
      var greet = Greet();

      assert.deepEqual("Hallo, Jon", greet.greetNeighbour("afrikaans", "Jon"));
    });

    it('should return the greeting in IsiXhosa', function() {
      var greet = Greet();

      assert.deepEqual("Molo, Jon", greet.greetNeighbour("isixhosa", "Jon"));
    });

    it('should return the counter value of people counted', function() {
      var greet = Greet();

      greet.greetNeighbour("English", "Jon")
      greet.greetNeighbour("Afrikaans", "Aviwe")
      greet.greetNeighbour("isixhosa", "Doe")

      assert.deepEqual(3, greet.checkGreets());
    });

    it('should return number of different names greeted', function() {
      var greet = Greet();

      greet.greetNeighbour("English", "Jon")
      greet.greetNeighbour("isixhosa", "Aviwe")
      greet.greetNeighbour("isixhosa", "Jon")

      assert.deepEqual(2, greet.checkGreets());
    });

    it('should return object of different names greeted with number of greets per each person', function() {
      var greet = Greet();

      greet.greetNeighbour("English", "Jon")
      greet.greetNeighbour("isixhosa", "Aviwe")
      greet.greetNeighbour("isixhosa", "Jon")

      assert.deepEqual({Jon: 2, Aviwe: 1}, greet.getGreetedNames());
    });

});
