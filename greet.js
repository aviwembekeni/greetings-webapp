module.exports = function(peopleGreeted){
   //var noOfGreetings = peopleGreeted? Object.keys(peopleGreeted).length : 0;
   //var namesGreeted = peopleGreeted || {} ;
   var noOfGreetings = 0;
   var namesGreeted = {};

  function greet(language, name){

    if (language !== undefined && name !== "") {

      if(namesGreeted[name] === undefined){
        noOfGreetings++;
        namesGreeted[name]= 1;
      }else{
        namesGreeted[name] += 1;
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

  function checkGreetings(){
    return noOfGreetings;
  }

  function checkGreetedNames(){
    return namesGreeted;
  }

  return {
    greetNeighbour : greet,
    checkGreets : checkGreetings,
    getGreetedNames : checkGreetedNames
  }

}
