export default function action() {
  return dispatch => {
    dispatch({
      type: "TOGGLE_SIDE_MENU",
      payload: null
    })
  }
}