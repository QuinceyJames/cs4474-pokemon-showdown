import TeamBuilderView from "../../views/team-builder-view/teamBuilderView";
import React from "react";

const initialState = {
  isSideMenuVisible: false,
  currentView: <TeamBuilderView/>
}

function reducer(state = initialState, {payload, type}) {
  switch (type) {
    case "TOGGLE_SIDE_MENU":
      return {...state, isSideMenuVisible: !state.isSideMenuVisible};
    case "SET_CURRENT_VIEW":
      return {...state, currentView: state.currentView};
    default:
      return state;
  }
}