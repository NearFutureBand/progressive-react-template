import { gql } from 'apollo-boost'
import createPieceOfState from './create'
const [createAction, createReducer] = createPieceOfState()

const defaultState = {
  reducerProp: null
}

// simple actions without request doesn't have requestConfig property
// pass onStart as the only one function
export const syncAction = createAction({
  type: 'SYNCRONOUS_ACTION',
  onStart: state => ({ ...state, reducerProp: 1 })
})

// async actions should always have requestConfig prop
// for graphql requests it also neccessary to pass a queryType: 'query' | 'mutation'
export const asyncAction = createAction({
  type: 'ASYNC_ACTION',
  queryType: 'query',
  onFailure: state => ({ ...state, reducerProp: 2 }),
  requestConfig: ({ param1, param2 }) => gql`
    {
      entityName(param1: ${param1}, param2: ${param2}) {
        value1
        value2
      }
    }
  `
})

export default createReducer(defaultState)
