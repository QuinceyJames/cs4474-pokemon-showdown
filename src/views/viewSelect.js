import React from 'react';
import {clearAllBodyScrollLocks, disableBodyScroll} from 'body-scroll-lock';
import {ROOT_ELEMENT_ID} from "../config/constants";
import {connect} from "react-redux";

const ViewSelect = ({currentView}) => {
  React.useEffect(() => {
    disableBodyScroll(document.getElementById(ROOT_ELEMENT_ID))
    return clearAllBodyScrollLocks
  }, [])

  return currentView;
}

const mapStateToProps = ({appState: {currentView}}) => ({currentView})
export default connect(mapStateToProps)(ViewSelect);
