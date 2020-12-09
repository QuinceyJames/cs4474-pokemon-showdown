import React from "react";
import TeamBuilderView from "../../views/team-builder-view/teamBuilderView";

const initialState = {
  currentView: <TeamBuilderView/>,
  isSideMenuVisible: false,
  activePokemonList: Array.from(Array(6), () => ({name: ""})),
  activePokemonIndex: -1,
  activePokemon: null
}

const appState = (state = initialState, {payload, type}) => {
  switch (type) {
    case "TOGGLE_SIDE_MENU": {
      return {...state, isSideMenuVisible: !state.isSideMenuVisible};
    }

    case "SET_ACTIVE_POKEMON": {
      const {activePokemonList, activePokemonIndex, activePokemon} = state;
      const x = {
        ...activePokemon,
        ...payload.activePokemon
      }
      activePokemonList[activePokemonIndex] = x

      return {...state, activePokemonList, activePokemon: x}
    }

    case "SWITCH_VIEW": {
      return {
        ...state,
        activePokemon: state.activePokemonList[payload.activePokemonIndex] || null,
        activePokemonIndex: payload.activePokemonIndex || -1,
        ...payload
      };
    }

    default: {
      return state;
    }
  }
}

export default appState