import LadderView from "../../../views/staticViews/ladderView";
import React from "react";

export default function action() {
    console.log("go to ladder view")
  return {
    type: "SWITCH_VIEW",
    payload: {currentView: <LadderView/>}
  }
}