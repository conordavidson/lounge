import { combineReducers } from 'redux'
import player from 'state/reducers/player'
import list from 'state/reducers/list'
import ui from 'state/reducers/ui'

export default combineReducers({
  player,
  list,
  ui
})
