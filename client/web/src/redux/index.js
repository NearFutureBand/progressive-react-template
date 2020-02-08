import { combineReducers } from 'redux'

export default combineReducers({
  main: (state = { reducerProp: null }, action) => ({ ...state })
})
