import { takeEvery, select } from 'redux-saga/effects'
import {
  NEXT_MOVIE,
  QUEUE_BACKWARD,
  SAVE_MOVIE,
  DELETE_MOVIE,
  SET_QUERY,
  TOGGLE_PLAY_PAUSE
} from 'state/actions'
import { _movies } from 'state/sagas/selectors'
import Track from 'external/mixpanel'

export default function* analyticActionCapture() {
  yield takeEvery([
    NEXT_MOVIE,
    QUEUE_BACKWARD,
    SAVE_MOVIE,
    DELETE_MOVIE,
    SET_QUERY,
    TOGGLE_PLAY_PAUSE
  ], trackAction)
}

function* trackAction(action) {
  switch(action.type) {
    case NEXT_MOVIE:
      return Track.NEXT_MOVIE({ type: action.payload })
    case QUEUE_BACKWARD:
      return Track.PREV_MOVIE()
    case SAVE_MOVIE:
      return Track.SAVE_MOVIE({
        movie_id: action.payload.id,
        movie_title: action.payload.title,
        movie_youtube_key: action.payload.trailer.key
      })
    case DELETE_MOVIE:
      const movies = yield select(_movies)
      const deletedMovie = movies[action.payload]
      return Track.DELETE_MOVIE({
        movie_id: deletedMovie.id,
        movie_title: deletedMovie.title,
        movie_youtube_key: deletedMovie.trailer.key
      })
    case SET_QUERY:
      return Track.SET_QUERY({
        genre: action.payload.genre,
        time_period: {
          min: action.payload.years.min,
          max: action.payload.years.max
        }
      })
    case TOGGLE_PLAY_PAUSE:
      return Track.TOGGLE_PLAY_PAUSE({ key: action.payload })
    default: return
  }
}
