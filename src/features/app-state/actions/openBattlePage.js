import BattlePage from "../../../views/battle-page/battlePage";
import React from "react";

export default function action() {
    console.log("go battle")
    return {
        type: "SWITCH_VIEW",
        payload: {currentView: <BattlePage/>}
    }
}