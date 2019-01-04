import { put, call, select } from 'redux-saga/effects'
import { _genre, _years, _totalPages } from 'state/sagas/selectors'
import unsuccessfulTrailerAttemptTimeout from 'state/sagas/unsuccessfulTrailerAttemptTimeout'
import { TMDB_fetchMovies, TMDB_fetchDetails } from 'external/themoviedb/queries'
import { FETCH_TRAILER_PENDING, SET_MOVIE } from 'state/actions'
import randomItem from 'utils/randomItem'
import randomInt from 'utils/randomInt'

export default function* attemptForTrailer() {
  yield put({ type: FETCH_TRAILER_PENDING })
  const genre = yield select(_genre)
  const years = yield select(_years)
  const totalPages = yield select(_totalPages)

  let foundTrailer = false
  let errored = false

  while (!foundTrailer && !errored) {
    const { response: moviesResponse, error: moviesError } = yield call(TMDB_fetchMovies, {
      genre,
      years,
      pageNumber: randomInt(totalPages),
    })
    const moviesData = yield moviesResponse.json()
    if (moviesData.status_code === 25) {
      // Request limit reached
      errored = true
      continue
    }
    const randomMovie = randomItem(moviesData.results)
    const { response: detailsResponse, error: detailsError } = yield call(TMDB_fetchDetails, {
      id: randomMovie.id,
    })
    const detailsData = yield detailsResponse.json()
    if (detailsData.status_code === 25) {
      // Request limit reached
      errored = true
      continue
    }
    if (detailsData.videos.results.length) {
      foundTrailer = true
      yield put({
        type: SET_MOVIE,
        payload: detailsData,
      })
    }
  }
  if (!foundTrailer) yield call(unsuccessfulTrailerAttemptTimeout)
}
