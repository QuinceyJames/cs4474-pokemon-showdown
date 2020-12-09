// for more information on communicating with battle simulator,
// refer to https://github.com/smogon/pokemon-showdown/blob/master/sim/README.md
// to download simulator: npm install pokemon-showdown

const pokemon = require("./pokemon.js");
const fetch = require("node-fetch");

// pokeapi: https://pokeapi.co/
const pokeapi = "https://pokeapi.co/api/v2/pokemon/";

//problem 1: program keeps running while calling this function
//accessing info too soon after calling function will cause problems
//not sure how to fix
//problem 2: has trouble handling pokemon with alternate forms
//due to differences in showdown simulator and pokeapi
//(not a problem with older pokemon for the most part)
//fixing would require handling each unique case
async function getType(poke) {
  var name = poke.getSpecies();

  const response = await fetch(pokeapi + name);
  const json = await response.json();

  for (var i = 0; i < json.types.length; i++) {
    if (i == 0) {
      poke.setType1(json.types[i].type.name);
    } else {
      poke.setType2(json.types[1].type.name);
    }
  }

  //console.log(poke.getType());
}

class player {
  constructor() {
    this.team = [];
    //player active pokemon
    this.active;

    //four possible states:
    //'default' allows move selection and pokemon switch
    //'switch' only allows switching pokemon. used when active pokemon faints
    //'lose' when all pokemon faint
    //'win' if opponent state is 'lose'
    this.state = "default";
  }

  //set active pokemon to pokemon in slot pokemonIndex
  //if trying to switch into fainted pokemon, return error
  setActive(pokemon) {
    // if (pokemon.isKO()) {
    //  return -1;
    //}
    this.active = pokemon;
    //return 0;
  }

  //add a pokemon to the team
  setTeam(team) {
    this.team = team;
  }

  //state setters
  setDefaultState() {
    this.state = "default";
  }
  setSwitchState() {
    this.state = "switch";
  }
  setLoseState() {
    this.state = "lose";
  }
  setWinState() {
    this.state = "win";
  }

  getActive() {
    return this.active;
  }

  getTeam() {
    return this.team;
  }

  getState() {
    return this.state;
  }
}

//used to connect and itneract with simulator
class battle {
  constructor() {
    this.Sim = require("pokemon-showdown");
    this.stream = new this.Sim.BattleStream();

    //players
    this.player1 = new player();
    this.player2 = new player();

    //player 1 pokemon
    //this.active1;
    //this.team1 = [];
    //player 2 pokemon
    //this.active2;
    //this.team2 = [];

    (async () => {
      for await (const output of this.stream) {
        console.log(output);
        var outputList = output.split("\n");
        for (var i = 0; i < outputList.length; i++) {
          this.parseMessage(outputList[i].split("|"));
        }
      }
    })();
  }

  //format is the battle format (e.g. gen7ou)
  //TODO: find list of formats(?)
  //room needs at least 2 players; use addPLayer function
  makeRoom(format) {
    this.stream.write('>start {"formatid":"' + format + '"}');
  }

  //adds player to room
  //player is player position (e.g. 1 is player 1, 2 is player 2)
  //pID is player username
  //teamID is team number ***subject to change***
  addPlayer(player, pID, teamID = "") {
    player = ">player p" + player;
    player += ' {"name":"' + pID + '"';

    //if no teamID is supplied, the simulator will make a random team
    //this only applies to formats that don't require prebuilt teams (e.g. random battle formats)
    if (teamID != 0) {
      player += ',"team":"' + teamID + '"';
    }

    player += "}";
    this.stream.write(player);
  }

  //moveID can either be the slot the move is in or
  //the name of the move
  //player is either 1 or 2
  useMove(moveID, player) {
    this.stream.write(">p" + player + " move " + moveID);
  }

  //switches active pokemon with a benched pokemon
  //pokeID can either be the benched pokemon's name (string) or team position (int)
  //player is either 1 or 2
  switchPokemon(pokeID, player) {
    this.stream.write(">p" + player + " switch " + pokeID);
  }

  //performs an automatic action for given player
  //use to implement simple AI opponent
  //player is either 1 or 2
  autoAct(player) {
    var playerObj;
    if (player == 1) {
      playerObj = this.player1;
    } else {
      playerObj = this.player2;
    }

    switch (playerObj.state) {
      //switch to a random pokemon
      case "switch":
        var team = playerObj.getTeam();
        var index = Math.floor(Math.random() * team.length);
        //if selected random pokemon is defeated,
        //iterate until usable one is found
        while (team[index].isKO()) {
          index = (index + 1) % team.length;
        }
        this.switchPokemon(index + 1, player);
        break;

      //if battle finished, take no action
      case "win":
        break;
      case "lose":
        break;

      //use a random move
      default:
        //use random move
        var index = Math.floor(Math.random() * 4);
        this.useMove(index + 1, player);
    }
  }

  //for testing
  sendMessage(message) {
    this.stream.write(message);
  }

  //sets the states for each player based on battle state
  setStates() {
    this.player1.setDefaultState();
    this.player2.setDefaultState();

    console.log(this.player1.getActive());

    //if player pokemon KO'd this turn, check if rest of team KO'd
    //if so, set state to lose, otherwise set state to switch
    if (this.player1.getActive().isKO()) {
      var p1Team = this.player1.getTeam();
      var p1Lose = true;
      for (var i = 0; i < p1team.length; i++) {
        if (!p1Team[i].isKO()) {
          isLose = false;
          break;
        }
      }

      if (p1Lose) {
        this.player1.setLoseState();
        this.player2.setWinState();
      } else {
        this.player1.setSwitchState();
      }
    }

    //if battle hasn't ended, repeat for player 2
    if (this.player2.getActive().isKO() && this.player2.getState() != "win") {
      var p2Team = this.player2.getTeam();
      var p2Lose = true;
      for (var i = 0; i < p2team.length; i++) {
        if (p2Team[i].isKO()) {
          isLose = false;
          break;
        }
      }

      if (p2Lose) {
        this.player1.setWinState();
        this.player2.setLoseState();
      } else {
        this.player2.setSwitchState();
      }
    }

    console.log(this.player1.getState(), this.player2.getState());
  }

  //handles message from simulator
  //returns request type (choose move or change pokemon) for each player
  parseMessage(message) {
    //fix formatting
    if (message[0] == "") {
      message.shift();
    }

    var parsed = [];
    if (message[0] == "request") {
      var parsed = JSON.parse(message[1]);
      //console.log(parsed.active);
      var pID = parsed.side.id;
      var team = [];
      var pokes = parsed.side.pokemon;

      for (var i = 0; i < pokes.length; i++) {
        var details = pokes[i].details.split(", ");
        var name = details[0];

        //lowercase name to work with pokeAPI
        name = name.toLowerCase();
        name = name.replace("%20", "-");

        //get level. if no level given, level is 100
        var level = 100;
        if (details[1].startsWith("L")) {
          level = details[1].substring(1);
        }

        //get current and max HP
        var condition = pokes[i].condition.split("/");
        condition = [condition[0], condition[1]];

        var isActive = pokes[i].active;

        var stats = pokes[i].stats;
        var moves = pokes[i].moves;

        var newMember = new pokemon.Pokemon(
          name,
          moves,
          condition,
          level,
          stats
        );

        //set pokemon's type
        getType(newMember);

        team.push(newMember);

        if (isActive) {
          if (pID == 1) {
            this.player1.setActive(newMember);
          } else {
            this.player2.setActive(newMember);
          }
        }
      }

      if (pID == 1) {
        this.player1.setTeam(team);
      } else {
        this.player2.setTeam(team);
      }
    }

    //update player states
    //calling here is broken because setActive() call above not finished
    //no clue how to fix... maybe I need to rethink my life
    //maybe just call setStates() manually
    //this.setStates();
  }

  getP1() {
    return this.player1;
  }

  getP2() {
    return this.player2;
  }

  close() {
    this.stream.destroy();
  }
}
