module.exports = function(pool){

  async function greet(language, name){

    if (language !== undefined && name !== "") {

      var queryName = await pool.query('select * from users where name = $1', [name]);

      if(queryName.rowCount === 0){
        await pool.query('INSERT into users (name, greet_counter) values($1, $2)', [name, 1]);

      } else {
        await pool.query("UPDATE users set greet_counter= greet_counter+1 WHERE name = $1", [name])
      }

      if(language == "english"){
        return "Hello, "+ name;
      }else if (language == "isixhosa") {
        return "Molo, "+ name;
      }else if (language == "afrikaans") {
        return "Hallo, "+ name;
      }
    }

  }

  async function checkGreetings(){
   let results = await pool.query('SELECT * FROM users');
   //console.log(results.rowCount);
   return results.rowCount;
  }

  async function checkGreetedNames(){
    let results = await pool.query('SELECT name FROM users');
    return results.rows;

  }

  async function getGreetsForUser(name){
    let greets = await pool.query('select greet_counter from users where name = $1', [name]);
    return greets.rows[0].greet_counter;
  }

  async function reset(){
    let results =  await pool.query('DELETE FROM users;');
    return results.rows;

  }

  return {
    greetNeighbour : greet,
    checkGreets : checkGreetings,
    getGreetedNames : checkGreetedNames,
    getGreetsForUser,
    reset
  }

}
