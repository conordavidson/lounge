import { takeLatest } from 'redux-saga/effects'
import { SET_QUERY, NEXT_MOVIE } from 'state/actions'
import queryChain from 'state/sagas/queryChain'
import nextMovie from 'state/sagas/nextMovie'

export default function* root() {
  yield takeLatest(NEXT_MOVIE, nextMovie)
  yield takeLatest(SET_QUERY, queryChain)
}
