// for more information on communicating with battle simulator,
// refer to https://github.com/smogon/pokemon-showdown/blob/master/sim/README.md


const pokemon = require('./pokemon.js');
//used to connect and itneract with simulator
class battle {

  constructor() {
      this.Sim = require('pokemon-showdown');
      this.stream = new this.Sim.BattleStream();

      //player 1 pokemon
      this.active1;
      this.team1 = [];
      //player 2 pokemon
      this.active2;
      this.team2 = [];

      (async () => {
          for await (const output of this.stream) {
            var outputList = output.split('\n');
            for(var i = 0; i<outputList.length; i++) {
              this.parseMessage(outputList[i].split('|'));
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
  addPlayer(player, pID, teamID = '') {
    player = '>player p' + player;
    player += ' {"name":"' + pID + '"';
    
    //if no teamID is supplied, the simulator will make a random team
    //this only applies to formats that don't require prebuilt teams (e.g. random battle formats)
    if(teamID != 0) {
      player += ',"team":"' + teamID + '"';
    }

    player += '}';
    this.stream.write(player);
  }

  //moveID can either be the slot the move is in or
  //the name of the move
  //player is either 1 or 2
  useMove(moveID, player) {
    this.stream.write('>p' + player + ' move ' + moveID);
  }

  //switches active pokemon with a benched pokemon
  //pokeID can either be the benched pokemon's name (string) or team position (int)
  //player is either 1 or 2
  switchPokemon(pokeID, player) {
    this.stream.write('>p' + player + ' switch ' + pokeID);
  }

  //for testing
  sendMessage(message) {
    this.stream.write(message);
  }

  //handles message from simulator
  parseMessage(message) {
    //fix formatting
    if(message[0] == '') {
      message.shift()
    }
    
    var parsed = []
    if(message[0] == 'request') {
      var parsed = JSON.parse(message[1]);
      
      var pID = parsed.side.id
      var team = []
      var pokes = parsed.side.pokemon

      for(var i = 0; i < pokes.length; i++) {
        var details = pokes[i].details.split(', ')
        var name = details[0]
        
        //set level. if no level given, level is 100
        var level = 100
        if(details[1].startsWith('L')) {
          level = details[1].substring(1)
        }

        //get current and max HP
        var condition = pokes[i].condition.split('/')
        condition = [condition[0], condition[1]]

        var isActive = pokes[i].active

        var stats = pokes[i].stats
        var moves = pokes[i].moves
        
        var newMember = new pokemon.Pokemon(name, moves, condition, level, stats)

        team.push(newMember)

        if(isActive) {
          if(pID == 1) {
            this.active1 = newMember
          }
          else {
            this.active2 = newMember
          }
        }
      }

      if(pID == 1) {
        this.team1 = team;
      }
      else {
        this.team2 = team;
      }
    }
  }

  close() {
    this.stream.destroy()
  }
}
