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
  let attempts = 0

  /*
  We will make 18 attempts to get a movie with trailer. TMDB API limit is 40,
  but we make two calls in each attempt. One for random page of movies, one for
  movie details. The other two account for the initial query meta call, plus one
  for padding.
  */

  while(!foundTrailer && attempts < 19) {
    const moviesFetch = yield call(TMDB_fetchMovies, {
      genre,
      years,
      pageNumber: randomInt(totalPages)
    })
    const movies = yield moviesFetch.json()
    const randomMovie = randomItem(movies.results)
    const detailsFetch = yield call(TMDB_fetchDetails, {
      id: randomMovie.id
    })
    const details = yield detailsFetch.json()
    if (details.videos.results.length) {
      foundTrailer = true
      yield put({
        type: SET_MOVIE,
        payload: details
      })
    } else {
      attempts += 1
    }
  }
  if (!foundTrailer) yield call(unsuccessfulTrailerAttemptTimeout)
}
