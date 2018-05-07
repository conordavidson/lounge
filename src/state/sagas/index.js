import { takeLatest, throttle } from 'redux-saga/effects'
import {
  SET_QUERY,
  NEXT_MOVIE,
  START_CONTROL_DISPLAY_TIMEOUT,
  TOGGLE_PLAY_PAUSE
} from 'state/actions'
import queryChain from 'state/sagas/queryChain'
import nextMovie from 'state/sagas/nextMovie'
import controlDisplayTimeout from 'state/sagas/controlDisplayTimeout'
import toggleYoutubePlayerPlayPause from 'state/sagas/toggleYoutubePlayerPlayPause'

export default function* root() {
  yield takeLatest(NEXT_MOVIE, nextMovie)
  yield takeLatest(SET_QUERY, queryChain)
  yield takeLatest(TOGGLE_PLAY_PAUSE, toggleYoutubePlayerPlayPause)
  yield throttle(50, START_CONTROL_DISPLAY_TIMEOUT, controlDisplayTimeout)
}
