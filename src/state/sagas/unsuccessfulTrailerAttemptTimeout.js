import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import {
  START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT,
  END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT,
} from 'state/actions'

export default function* unsuccessfulTrailerAttemptTimeout() {
  yield put({ type: START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT })
  yield call(delay, 10000)
  yield put({ type: END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT })
}
