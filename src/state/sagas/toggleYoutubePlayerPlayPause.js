import { put, select } from 'redux-saga/effects'
import { _youtubePlayerInstance } from 'state/sagas/selectors'
import { PLAY_YOUTUBE_PLAYER, PAUSE_YOUTUBE_PLAYER } from 'state/actions'

export default function* toggleYoutubePlayerPlayPause() {
  const youtubePlayer = yield select(_youtubePlayerInstance)
  if (youtubePlayer) {
    const state = youtubePlayer.getPlayerState();
    if (state === 1) {
      youtubePlayer.pauseVideo()
      yield put({ type: PAUSE_YOUTUBE_PLAYER })
    } else {
      youtubePlayer.playVideo()
      yield put({ type: PLAY_YOUTUBE_PLAYER })
    }
  }
}
