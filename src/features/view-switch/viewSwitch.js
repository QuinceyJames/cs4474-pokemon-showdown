import TeamBuilderView from "../../views/team-builder-view/teamBuilderView";
import React from "react";

const initialState = {
  currentView: <TeamBuilderView/>,
}

const viewSwitch = (state = initialState, {type, payload}) => {
  switch (type) {
    case "SWITCH_VIEW":
      return {...state, currentView: payload};
    default:
      return state;
  }
}

export default viewSwitch;