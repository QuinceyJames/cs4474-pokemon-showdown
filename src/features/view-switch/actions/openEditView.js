import PokemonSearchView from "../../../views/pokemon-search-view/pokemonSearchView";
import React from "react";

export default function action(pokemonIndex) {
  return {
    type: "SWITCH_VIEW",
    payload: <PokemonSearchView pokemonIndex={pokemonIndex}/>
  }
}