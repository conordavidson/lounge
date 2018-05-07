import { delay } from 'redux-saga'
import { put, take, race } from 'redux-saga/effects'
import {
  START_CONTROL_DISPLAY_TIMEOUT,
  CANCEL_CONTROL_DISPLAY_TIMEOUT,
  END_CONTROL_DISPLAY_TIMEOUT
} from 'state/actions'

export default function* controlDisplayTimeout() {
  const { timeout /* , cancel, debounce */ } = yield race({
    timeout: delay(4000),
    cancel: take(CANCEL_CONTROL_DISPLAY_TIMEOUT),
    debounce: take(START_CONTROL_DISPLAY_TIMEOUT)
  })
  if (timeout) yield put({ type: END_CONTROL_DISPLAY_TIMEOUT })
}
