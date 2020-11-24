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
              //console.log(output.split('|'));
              var outputList = output.split('\n');
              for(var i = 0; i<outputList.length; i++) {
                this.parseMessage(outputList[i].split('|'));
              }
            }
        })();
        
        /*
        this.net = require('net');
        
        this.stream = new this.net.Socket();
        this.stream.connect({port: 8000, host: "localhost"})
        
        this.stream.on('data', (data) => {
          console.log(data.toString('utf-8'));
        });
        */
    }



    //format is the battle format (e.g. gen7ou)
    //TODO: find list of formats(?)
    //room needs at least 2 players; use addPLayer function
    makeRoom(format) {
        console.log('>start {"formatid":"' + format + '"}');
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
        
        console.log(player);
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
      if(message[0] == ''){
        message.shift();
      }
      
      var parsed = []
      //console.log(message[i] + i)
      if(message[0] == 'request') {
        parsed = message[1].split('{').join('')
        parsed = parsed.split('}').join('')
        parsed = parsed.split('[').join('')
        parsed = parsed.split(']').join('')
        parsed = parsed.split(',')
        
        //create active pokemon
        for(var i = 0; i < parsed.length; i++) {
          //if 
        }
      }
      //console.log(message[i] + i)

      console.log(parsed);
    }
}

/*
console.log(pokemon.isEffective('poison', 'fairy'));

b = new battle();

b.makeRoom("gen7randombattle");
b.addPlayer(1, "Alice");
b.addPlayer(2, "Bob");
*/

