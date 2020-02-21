import axiosInstance from '../configureAxios';
import apolloClient from '../configureApollo';

const successType = type => `${type}_SUCCESS`;
const startType = type => `${type}_START`;
const failureType = type => `${type}_FAILURE`;

const makeRequest = (type, requestType, payload, requestConfig) => {
  return async dispatch => {
    const {onSuccessCallback, onFailureCallback} = payload || {};
    dispatch({type: startType(type), payload});

    try {
      let response;
      if (requestType === requestTypes.REQUEST) {
        response = await axiosInstance.request(requestConfig(payload));
      } else {
        response = await apolloClient[
          requestType === requestTypes.GRAPHQL_MUTATION ? 'mutate' : requestType
        ]({
          [requestType]: requestConfig(payload),
        });
      }
      console.log(payload, response);
      dispatch({
        type: successType(type),
        payload,
        response: response.data,
      });
      if (onSuccessCallback) {
        onSuccessCallback(dispatch);
      }
      return;
    } catch (error) {
      console.log(error);
      dispatch({
        type: failureType(type),
        payload,
        error,
      });
      if (onFailureCallback) {
        onFailureCallback(dispatch);
      }
      return;
    }
  };
};

const createAction = ({
  reducerMap,
  type,
  requestType,
  onStart = state => ({...state}),
  onSuccess = state => ({...state}),
  onFailure = state => ({...state}),
  requestConfig,
}) => {
  const actionCreator = requestType
    ? payload => makeRequest(type, requestType, payload, requestConfig)
    : payload => ({type, payload});
  if (requestType) {
    reducerMap[startType(type)] = onStart;
    reducerMap[successType(type)] = onSuccess;
    reducerMap[failureType(type)] = onFailure;
  } else {
    reducerMap[`${type}`] = onStart;
  }
  return actionCreator;
};

const createReducer = (defaultState, reducerMap) => {
  return (state = defaultState, action) => {
    return action.type in reducerMap
      ? reducerMap[action.type](state, action)
      : {...state};
  };
};

const createPieceOfState = () => {
  const reducerMap = {};
  return [
    args => createAction({reducerMap, ...args}),
    defaultState => createReducer(defaultState, reducerMap),
  ];
};

export const requestTypes = {
  GRAPHQL_QUERY: 'query',
  GRAPHQL_MUTATION: 'mutation',
  REQUEST: 'request',
};

export default createPieceOfState;
