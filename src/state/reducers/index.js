import { combineReducers } from 'redux'
import player from 'state/reducers/player'
import list from 'state/reducers/list'

export default combineReducers({
  player,
  list
})
