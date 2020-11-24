import React from "react";

const initialState = {
  isSideMenuVisible: false,
  pokemonList: Array.from(Array(6), () => ({id: 0}))
}

const appState = (state = initialState, {payload, type}) => {
  switch (type) {
    case "TOGGLE_SIDE_MENU":
      return {...state, isSideMenuVisible: !state.isSideMenuVisible};
    case "SET_POKEMON":
      return {
        ...state
      }
    default:
      return state;
  }
}

export default appState