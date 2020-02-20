import immutableUpdate from 'immutable-update'
import * as actions from './actions'

const initialState = {
  message: {
    type: 'info', // info, error, warn
    text: ''
  },
  responsive: {
    window: {},
    device: ''
  }
} 

const reducers = { 

} 

const reducer = (state = initialState, action) => reducers[action.type] ? 
  reducers[action.type](state, action)
  :
  state

export default reducer