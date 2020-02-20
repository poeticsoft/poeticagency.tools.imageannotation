import { combineReducers } from 'redux';

import ui from './modules/ui/reducer'
import data from './modules/data/reducer'

const reducers = combineReducers({
  ui,
  data
});

export default reducers;