import React from 'react';
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
import {ROOT_ELEMENT_ID} from "../config/constants";
import {connect} from "react-redux";
import {library as FontAwesomeLibrary} from "@fortawesome/fontawesome-svg-core";

import {faPlusSquare} from "@fortawesome/free-solid-svg-icons"
import PokemonSearchView from "./pokemon-search-view/pokemonSearchView";
import TeamBuilderView from "./team-builder-view/teamBuilderView";

FontAwesomeLibrary.add(
  faPlusSquare
)

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
