import {gql} from 'apollo-boost';

import createPieceOfState from './create';
const [createAction, createReducer] = createPieceOfState();

const defaultState = {
  reducerProp: null,
};

export const syncAction = createAction({
  type: 'SYNC_ACTION',
  onStart: (state, action) => ({
    ...state,
    reducerProp: 1,
  }),
});

export default createReducer(defaultState);
