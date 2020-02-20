import immutableUpdate from 'immutable-update'
import * as actions from './actions'

const initialState = {
  annotations: []
} 

const reducers = {  

  [actions.DATA_ANNOTATIONS_LOADED]: (state, action) => immutableUpdate(
    state,
    { 
      annotations: action.payload.data
    }
  )
} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer