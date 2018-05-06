import { put, call, select } from 'redux-saga/effects'
import { _genre, _years } from 'state/sagas/selectors'
import attemptForTrailer from 'state/sagas/attemptForTrailer'
import { SET_QUERY_META } from 'state/actions'
import { TMDB_fetchMovies } from 'external/themoviedb/queries'

export default function* queryChain() {
  const genre = yield select(_genre)
  const years = yield select(_years)
  const queryMetaFetch = yield call(TMDB_fetchMovies, {
    genre,
    years,
    pageNumber: 1
  })
  const queryMeta = yield queryMetaFetch.json()
  yield put({
    type: SET_QUERY_META,
    payload: queryMeta
  })
  yield call(attemptForTrailer)
}
