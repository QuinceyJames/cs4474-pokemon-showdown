import React from 'react';
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
import {ROOT_ELEMENT_ID} from "../config/constants";
import openEditView from "../features/view-switch/actions/openEditView";
import {connect} from "react-redux";
import PokemonSearchView from "./pokemon-search-view/pokemonSearchView";

const ViewSelect = ({currentView}) => {
  console.log(currentView)
  React.useEffect(() => {
    disableBodyScroll(document.getElementById(ROOT_ELEMENT_ID))
    return clearAllBodyScrollLocks
  }, [])

  return currentView;
}

const mapStateToProps = ({viewSwitch:{currentView}}) => ({currentView})
export default connect(mapStateToProps)(ViewSelect);
