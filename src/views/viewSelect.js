import React from 'react';
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
import {ROOT_ELEMENT_ID} from "../config/constants";
import {connect} from "react-redux";
import PokemonSearchView from "./pokemon-search-view/pokemonSearchView";
import TeamBuilderView from "./team-builder-view/teamBuilderView";

const ViewSelect = () => {
  React.useEffect(() => {
    disableBodyScroll(document.getElementById(ROOT_ELEMENT_ID))
    return clearAllBodyScrollLocks
  }, [])


  switch (0) {
    case 1:
      return <PokemonSearchView/>

    case 0:
    default:
      return <TeamBuilderView/>
  }
}

const mapStateToProps = ({appState}) => ({appState})

export default connect(mapStateToProps)(ViewSelect);
