import React from "react";
import "./pokemonTrainerBattle.scss"
import ash from "./ash.png"
import bulbasaur from "./bulbasaur.png"
import pikachu from "./pikachu.png"


const PokemonTrainerBattle = () => (
  <>
  <img
    className={"pokemon-trainer-battle"}
    src={ash}
  />
  <img
  className={"pokemon-bulbasaur-battle"}
  src={bulbasaur}

/>
<img
  className={"pokemon-pikachu-battle"}
  src={pikachu}

/>
</>
);

export default PokemonTrainerBattle