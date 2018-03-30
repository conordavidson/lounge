import { combineReducers } from 'redux';
import player from './player';
import list from './list';

export default combineReducers({
  player,
  list
});
