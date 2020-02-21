import {combineReducers} from 'redux';

import MainReducer from './Main';
import AuthReducer from './AuthReducer';

export default combineReducers({
  main: MainReducer,
  auth: AuthReducer,
});
