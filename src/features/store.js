import {combineReducers, createStore} from "redux";
import appState from "./app-state/appState"
import viewSwitch from "./view-switch/viewSwitch";

const rootReducer = combineReducers({
  appState,
  viewSwitch
});

const store = createStore(rootReducer);

export default store;