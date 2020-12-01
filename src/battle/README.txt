battle.js contains functions for creating and executing a battle.

pokemon.js contains pokemon object used to track stats of each players pokemon.
These stats are primarily used for 'battle forecast'

Requires the pokemon showdown battle simulator.
To install, use: 
  npm install pokemon-showdown

TODO: 
- loading teams
  - depends on how teams are saved locally
  - simulator reads teams in json format (info here: 
      https://github.com/smogon/pokemon-showdown/blob/master/sim/SIM-PROTOCOL.md#possible-choices)
- bug fixes
  - stuff with asynchronous execution (especially regarding fetch requests)
