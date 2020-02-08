export const action = () => (dispatch) => {
  dispatch({ type: 'START_ACTION' })
  setTimeout(() => dispatch({ type: 'ASYNC_ACTION' }), 2000)
}
