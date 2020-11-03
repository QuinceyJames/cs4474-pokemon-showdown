const initialState = {
  isSideMenuVisible: false,
}

function reducer(state = initialState, {payload, type}) {
  switch (type) {
    case "TOGGLE_SIDE_MENU":
      return {...state, isSideMenuVisible: !state.isSideMenuVisible};
    default:
      return state;
  }
}