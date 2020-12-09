import ChallengesView from "../../../views/staticViews/challengesView";
import React from "react";

export default function action() {
    console.log("go to challenges view")
    return {
        type: "SWITCH_VIEW",
        payload: {currentView: <ChallengesView/>}
    }
}