import React from "react";
import TeamBuilderView from "../../views/team-builder-view/teamBuilderView";

const initialState = {
  currentView: <TeamBuilderView/>,
  isSideMenuVisible: false,
  pokemonList: Array.from(Array(6), () => ({id: 0})),
  pokemonIndex: -1,
  activePokemon: null
}

const appState = (state = initialState, {payload, type}) => {
  switch (type) {
    case "TOGGLE_SIDE_MENU":
      return {...state, isSideMenuVisible: !state.isSideMenuVisible};
    case "SET_POKEMON":
      const {pokemon} = payload;
      const {pokemonList, pokemonIndex} = state;
      pokemonList[pokemonIndex] = pokemon

      return {...state, pokemonList, activePokemon: pokemon}
    case "SWITCH_VIEW":
      console.log(payload)
      return {...state, ...payload};
    default:
      return state;
  }
}

export default appState