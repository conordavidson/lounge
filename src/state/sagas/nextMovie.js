import { put, call, select } from 'redux-saga/effects'
import { _queue, _currentMovieId } from 'state/sagas/selectors'
import attemptForTrailer from 'state/sagas/attemptForTrailer'
import { QUEUE_FORWARD } from 'state/actions'

export default function* nextMovie() {
  const queue = yield select(_queue)
  const currentMovieId = yield select(_currentMovieId)
  const queuePosition = queue.findIndex(id => id === currentMovieId)
  if (queuePosition === queue.length - 1) {
    yield call(attemptForTrailer)
  } else {
    yield put({ type: QUEUE_FORWARD })
  }
}
