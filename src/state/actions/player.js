import {
  TMDB_fetchMovies,
  TMDB_fetchDetails
} from 'external/themoviedb/queries'
import randomItem from 'utils/randomItem'

/*
Manipulations
*/
export const SET_GENRE = 'SET_GENRE'
export const setGenre = payload => {
  return {
    type: SET_GENRE,
    payload: Promise.resolve(payload)
  }
}

export const SET_YEARS = 'SET_YEARS'
export const setYears = payload => {
  return {
    type: SET_YEARS,
    payload: Promise.resolve(payload)
  }
}

export const QUEUE_FORWARD = 'QUEUE_FORWARD'
export const queueForward = () => {
  return {
    type: QUEUE_FORWARD,
    payload: Promise.resolve()
  }
}

export const QUEUE_BACKWARD = 'QUEUE_BACKWARD'
export const queueBackward = () => {
  return {
    type: QUEUE_BACKWARD,
    payload: Promise.resolve()
  }
}

export const UNSUCCESSFUL_TRAILER_ATTEMPT = 'UNSUCCESSFUL_TRAILER_ATTEMPT'
export const unsuccessfulTrailerAttempt = () => {
  return {
    type: UNSUCCESSFUL_TRAILER_ATTEMPT,
    payload: Promise.resolve()
  }
}

export const SUCCESSFUL_TRAILER_ATTEMPT = 'SUCCESSFUL_FETCH_ATTEMPT'
export const successfulTrailerAttempt = () => {
  return {
    type: SUCCESSFUL_TRAILER_ATTEMPT,
    payload: Promise.resolve()
  }
}

export const TRAILER_FETCH_DIFFICULTY = 'TRAILER_FETCH_DIFFICULTY'
export const trailerFetchDifficulty = () => dispatch => {
  return dispatch({
    type: TRAILER_FETCH_DIFFICULTY,
    payload: Promise.resolve()
  })
  .then(() => {
    return dispatch(startTrailerFetchTimeout())
  })
}

export const START_TRAILER_FETCH_TIMEOUT = 'START_TRAILER_FETCH_TIMEOUT'
export const startTrailerFetchTimeout = () => dispatch => {
  return dispatch({
    type: START_TRAILER_FETCH_TIMEOUT,
    payload: Promise.resolve()
  })
  .then(() => {
    setTimeout(() => dispatch(endTrailerFetchTimeout()), 10000)
  })
}

export const END_TRAILER_FETCH_TIMEOUT = 'END_TRAILER_FETCH_TIMEOUT'
export const endTrailerFetchTimeout = () => {
  return {
    type: END_TRAILER_FETCH_TIMEOUT,
    payload: Promise.resolve()
  }
}

/*
Data receiving
*/

export const RECEIVE_QUERY_META = 'RECEIVE_QUERY_META'
export const receiveQueryMeta = payload => {
  return {
    type: RECEIVE_QUERY_META,
    payload: Promise.resolve(payload)
  }
}

export const RECEIVE_MOVIE = 'RECEIVE_MOVIE'
export const receiveMovie = payload => {
  return {
    type: RECEIVE_MOVIE,
    payload: Promise.resolve(payload)
  }
}

export const RECEIVE_MOVIE_DETAILS = 'RECEIVE_MOVIE_DETAILS'
export const receiveMovieDetails = payload => {
  return {
    type: RECEIVE_MOVIE_DETAILS,
    payload: Promise.resolve(payload)
  }
}

/*
Data fetching
*/

export const FETCH_QUERY_META = 'FETCH_QUERY_META'
export const fetchQueryMeta = payload => {
  return {
    type: 'FETCH_QUERY_META',
    payload: new Promise((resolve, reject) => {
      return TMDB_fetchMovies({
        genre: payload.genre,
        years: payload.years,
        pageNumber: 1
      })
      .then(data => data.json())
      .catch(error => reject(error))
      .then(data => {
        resolve({
          ...data,
          ...payload
        })
      })
    })
  }
}

export const FETCH_MOVIES = 'FETCH_MOVIES'
export const fetchMovies = payload => {
  return {
    type: 'FETCH_MOVIES',
    payload: new Promise((resolve, reject) => {
      return TMDB_fetchMovies({ ...payload })
        .then(data => resolve(data.json()))
        .catch(error => reject(error))
    })
  }
}

export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS'
export const fetchMovieDetails = payload => {
  return {
    type: 'FETCH_MOVIE_DETAILS',
    payload: new Promise((resolve, reject) => {
      return TMDB_fetchDetails({ id: payload })
        .then(data => resolve(data.json()))
        .catch(error => reject(error))
    })
  }
}

/*
Fetch and receive wrappers (getters)
*/

export const FETCH_AND_RECEIVE_QUERY_META = 'FETCH_AND_RECEIVE_QUERY_META'
export const fetchAndReceiveQueryMeta = payload => (dispatch, getState) => {
  return dispatch({
    type: FETCH_AND_RECEIVE_QUERY_META,
    payload: new Promise((resolve, reject) => {
      return dispatch(fetchQueryMeta({ ...payload }))
        .then(({ value, action }) => {
          return dispatch(receiveQueryMeta({ ...value }))
          .then(() => resolve())
        })
    })
  })
}

export const FETCH_AND_RECEIVE_RANDOM_MOVIE = 'FETCH_AND_RECEIVE_RANDOM_MOVIE'
export const fetchAndReceiveRandomMovie = payload => (dispatch, getState) => {
  return dispatch({
    type: FETCH_AND_RECEIVE_RANDOM_MOVIE,
    payload: new Promise((resolve, reject) => {
      return dispatch(fetchMovies({ ...payload }))
        .then(({ value, action }) => {
          return dispatch(receiveMovie(randomItem(value.results)))
          .then(() => resolve())
        })
    })
  })
}

export const TRY_FOR_TRAILER = 'TRY_FOR_TRAILER'
export const tryForTrailer = payload => (dispatch, getState) => {
  return dispatch({
    type: TRY_FOR_TRAILER,
    payload: new Promise((resolve, reject) => {
      return dispatch(fetchAndReceiveRandomMovie({ ...payload }))
        .then(() => {
          return dispatch(fetchMovieDetails(getState().player.currentMovieId))
          .then(({ value, action }) => {
            if (value.videos.results.length) {
              return dispatch(successfulTrailerAttempt())
              .then(() => {
                return dispatch(receiveMovieDetails(value))
                .then(() => resolve())
              })
            } else {
              if (getState().player.unsuccessfulTrailerAttempts > 39) {
                reject()
              } else {
                return dispatch(unsuccessfulTrailerAttempt())
                .then(() => {
                  return dispatch(tryForTrailer({ ...payload }))
                  .catch(() => dispatch(trailerFetchDifficulty()))
                })
              }
            }
          })
        })
    })
  })
}

/*
Action chains
*/

export const SET_GENRE_AND_QUERY = 'SET_GENRE_AND_QUERY'
export const setGenreAndQuery = payload => (dispatch, getState) => {
  return dispatch({
    type: 'SET_GENRE_AND_QUERY',
    payload: new Promise((resolve, reject) => {
      return dispatch(setGenre(payload))
        .then(() => {
          return dispatch(
            queryForMovies({
              genre: getState().player.genre,
              years: getState().player.years
            })
          )
          .then(() => resolve())
        })

    })
  })
}

export const SET_YEARS_AND_QUERY = 'SET_YEARS_AND_QUERY'
export const setYearsAndQuery = payload => (dispatch, getState) => {
  return dispatch({
    type: 'SET_YEARS_AND_QUERY',
    payload: new Promise((resolve, reject) => {
      dispatch(setYears(payload))
      .then(() => {
        return dispatch(
          queryForMovies({
            genre: getState().player.genre,
            years: getState().player.years
          })
        )
        .then(() => resolve())
      })
    })
  })
}

export const QUERY_FOR_MOVIES = 'QUERY_FOR_MOVIES'
export const queryForMovies = payload => (dispatch, getState) => {
  return dispatch({
    type: 'QUERY_FOR_MOVIES',
    payload: new Promise((resolve, reject) => {
      dispatch(fetchAndReceiveQueryMeta({ ...payload }))
      .then(() => {
        return dispatch(
          tryForTrailer({
            pageNumber:
              Math.floor(Math.random() * getState().player.totalPages) + 1,
            genre: getState().player.genre,
            years: getState().player.years
          })
        )
        .catch(() => dispatch(trailerFetchDifficulty()))
        .then(() => resolve())
      })
    })
  })
}

export const NEXT_MOVIE = 'NEXT_MOVIE'
export const nextMovie = payload => (dispatch, getState) => {
  const queuePosition = getState().player.queue.findIndex(id => {
    return id === getState().player.currentMovieId
  })
  if (queuePosition === getState().player.queue.length - 1) {
    return dispatch({
      type: 'NEXT_MOVIE',
      payload: new Promise((resolve, reject) => {
        return dispatch(
          fetchAndReceiveRandomMovie({
            pageNumber:
              Math.floor(Math.random() * getState().player.totalPages) + 1,
            genre: getState().player.genre,
            years: getState().player.years
          })
        )
        .then(() => {
          return dispatch(
            tryForTrailer({
              pageNumber:
                Math.floor(Math.random() * getState().player.totalPages) + 1,
              genre: getState().player.genre,
              years: getState().player.years
            })
          )
          .catch(() => dispatch(trailerFetchDifficulty()))
          .then(() => resolve())
        })
      })
    })
  } else {
    return dispatch({
      type: 'NEXT_MOVIE',
      payload: new Promise((resolve, reject) => {
        dispatch(queueForward()).then(() => resolve())
      })
    })
  }
}

export const PREVIOUS_MOVIE = 'PREVIOUS_MOVIE'
export const previousMovie = payload => (dispatch, getState) => {
  return dispatch({
    type: 'PREVIOUS_MOVIE',
    payload: new Promise((resolve, reject) => {
      return dispatch(queueBackward()).then(() => resolve())
    })
  })
}
