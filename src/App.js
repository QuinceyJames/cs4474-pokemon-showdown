import React from 'react';
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
import {ROOT_ELEMENT_ID} from "./config/constants";
import {connect} from "react-redux";
import TeamBuilderView from "./views/team-builder-view";

function App() {
  React.useEffect(() => {
    disableBodyScroll(document.getElementById(ROOT_ELEMENT_ID))
    return clearAllBodyScrollLocks
  }, [])

  return (
    <TeamBuilderView/>
  );
}

const mapStateToProps = ({appState}) => ({appState})

export default connect(mapStateToProps)(App);
