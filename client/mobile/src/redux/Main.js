import {gql} from 'apollo-boost';

import createPieceOfState, {requestTypes} from './create';
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

export const asyncAction = createAction({
  type: 'ASYNC_ACTION',
  onFailure: (state, action) => ({
    ...state,
    reducerProp: 2,
  }),
  requestType: requestTypes.REQUEST,
  requestConfig: params => ({
    method: 'get',
  }),
});

export default createReducer(defaultState);
