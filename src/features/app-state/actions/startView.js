export default function action() {
  return dispatch => {
    dispatch({
      type: "START_VIEW",
      payload: null
    })
  }
}