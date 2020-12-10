pokemon.js
---------------
Contains pokemon class, which contains individual pokemon's information including stats, type, HP, etc...
Also includes functions for type effectiveness and damage calculation, which uses the info in the pokemon class. 
Note: damage calculation function doesn't consider random variance present in official games. This calculation
  has no direct effect on battle and is only for battle forecast

battle.js
---------------
Contains a player class which stores information on a player's team. One pokemon on the team is also the "active"
pokemon (i.e. the one currently in battle). Each player also has a 'state' which may be useful for displaying the correct
prompts for the player
Possible states are:
    - default: the usual state; player can choose moves or switch pokemon
    - switch: when a player's active pokemon is reduced to 0 HP, they are only able to switch pokemon
    - win/lose: game finish states

Battle class is a single battle instance. Contains two player objects and a showdown battle simulator read/write stream.
Use the makeRoom function to initiate the battle with the specified format. Some example formats are gen7randombattle and gen7ou.
Once the room is made, two players need to be added using addPlayer. This only requires a player number (1 or 2) and playerID (username) 
There needs to be one player with player number 1 and another with player number 2. (player 1 and player 2 respectively)
If the format is not a "random battle" format a team needs to be supplied in JSON format. (link with information in notes below)
***Doing this will require a function to convert local teams to proper format (currently not implemented, depends how teams are saved locally).***

The command methods useMove and switchPokemon write a command to the simulator. All calculations are handled by the simulator.
At the start of each turn, the simulator writes a response which contains each player's team in JSON format. 
This response is parsed and the information is used to update the status of each player's team locally. The setState method can then be
called to update each player's 'state' based on the results (e.g. if player1's pokemon faints, their state will be changed to 'switch')
The autoAct method chooses a random action for the specified player based on their state.

notes
---------------
Requires the pokemon showdown battle simulator.
To install, use: 
  npm install pokemon-showdown

TODO: 
- fix issue: pokemon and move formats on simulator and in pokeapi differ (e.g. "tailwhip" on simulator, "tail-whip" in pokeapi)
  - this is a problem for determining move types
- loading teams
  - depends on how teams are saved locally
  - simulator reads teams in json format (info here: 
      https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md#choice-requests)
- bug fixes
  - stuff with asynchronous execution (especially regarding fetch requests)
