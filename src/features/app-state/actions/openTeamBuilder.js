import React from "react";
import TeamBuilderView from "../../../views/team-builder-view/teamBuilderView";

export default function action() {
  console.log("go home")
  return {
    type: "SWITCH_VIEW",
    payload: {currentView: <TeamBuilderView/>}
  }
}