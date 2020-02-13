// THIS VERSION IS ADAPTED TO WORK WITH GRAPHQL

import apolloClient from '../configureApollo'

const successType = type => `${type}_SUCCESS`
const startType = type => `${type}_START`
const failureType = type => `${type}_FAILURE`

const makeRequest = (
  type,
  queryType,
  payload,
  requestConfig
) => {
  return async (dispatch) => {
    const { onSuccessCallback, onFailureCallback } = payload || {}
    dispatch({ type: startType(type), payload })

    try {
      const response = await apolloClient[queryType === 'mutation' ? 'mutate' : queryType]({
        [queryType]: requestConfig(payload)
      })
      console.log(payload, response)
      dispatch({
        type: successType(type),
        payload,
        response: response.data
      })
      if (onSuccessCallback) {
        onSuccessCallback(dispatch)
      }
      return
    } catch (error) {
      console.log(error)
      dispatch({
        type: failureType(type),
        payload,
        error
      })
      if (onFailureCallback) {
        onFailureCallback(dispatch)
      }
    }
  }
}

const createAction = ({
  reducerMap,
  type,
  queryType,
  onStart = (state) => ({ ...state }),
  onSuccess = (state) => ({ ...state }),
  onFailure = (state) => ({ ...state }),
  requestConfig
}) => {
  const actionCreator = requestConfig
    ? (payload) => makeRequest(
      type,
      queryType,
      payload,
      requestConfig
    )
    : (payload) => ({ type, payload })
  if (requestConfig) {
    reducerMap[startType(type)] = onStart
    reducerMap[successType(type)] = onSuccess
    reducerMap[failureType(type)] = onFailure
  } else {
    reducerMap[`${type}`] = onStart
  }
  return actionCreator
}

const createReducer = (defaultState, reducerMap) => {
  return (state = defaultState, action) => {
    return action.type in reducerMap
      ? reducerMap[action.type](state, action)
      : { ...state }
  }
}

const createPieceOfState = () => {
  const reducerMap = {}
  return [
    (args) => createAction({ reducerMap, ...args }),
    (defaultState) => createReducer(defaultState, reducerMap)
  ]
}

export default createPieceOfState
