import PokemonSearchView from "../../../views/pokemon-search-view/pokemonSearchView";
import React from "react";

export default function action(activePokemonIndex) {
  return {
    type: "SWITCH_VIEW",
    payload: {currentView: <PokemonSearchView/>, activePokemonIndex}
  }
}