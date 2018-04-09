import { TMDB_fetchMovies, TMDB_fetchDetails } from '../external/themoviedb/queries'
import randomItem from '../utils/randomItem'

/*
Manipulations
*/
export const SET_GENRE = 'SET_GENRE'
export const setGenre = payload => dispatch => {
  return dispatch({
    type: SET_GENRE,
    payload: Promise.resolve(payload)
  })
}

export const SET_YEARS = 'SET_YEARS'
export const setYears = payload => dispatch => {
  return dispatch({
    type: SET_YEARS,
    payload: Promise.resolve(payload)
  })
}

export const QUEUE_FORWARD = 'QUEUE_FORWARD'
export const queueForward = () => dispatch => {
  return dispatch({
    type: QUEUE_FORWARD,
    payload: Promise.resolve()
  })
}

export const QUEUE_BACKWARD = 'QUEUE_BACKWARD'
export const queueBackward = () => dispatch => {
  return dispatch({
    type: QUEUE_BACKWARD,
    payload: Promise.resolve()
  })
}

/*
Data receiving
*/

export const RECEIVE_QUERY_META = 'RECEIVE_QUERY_META'
export const receiveQueryMeta = payload => dispatch => {
  return dispatch({
    type: RECEIVE_QUERY_META,
    payload: Promise.resolve(payload)
  })
}

export const RECEIVE_MOVIE = 'RECEIVE_MOVIE'
export const receiveMovie = payload => dispatch => {
  return dispatch({
    type: RECEIVE_MOVIE,
    payload: Promise.resolve(payload)
  })
}

export const RECEIVE_MOVIE_DETAILS = 'RECEIVE_MOVIE_DETAILS';
export const receiveMovieDetails = payload => dispatch => {
  return dispatch({
    type: RECEIVE_MOVIE_DETAILS,
    payload: Promise.resolve(payload)
  })
}

/*
Data fetching
*/

export const FETCH_QUERY_META = 'FETCH_QUERY_META'
export const fetchQueryMeta = payload => (dispatch, getState) => {
  return dispatch({
    type: 'FETCH_QUERY_META',
    payload: new Promise((resolve, reject) => TMDB_fetchMovies({
        genre: payload.genre,
        years: payload.years,
        pageNumber: 1
      })
      .then(data => data.json())
      .catch(error => reject(error))
      .then(data => resolve({
        ...data,
        ...payload
      }))
    )
  })
}

export const FETCH_MOVIES = 'FETCH_MOVIES'
export const fetchMovies = payload => dispatch => {
  return dispatch({
    type: 'FETCH_MOVIES',
    payload: new Promise((resolve, reject) => TMDB_fetchMovies({ ...payload })
      .then(data => resolve(data.json()))
      .catch(error => reject(error))
    )
  })
}

export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS'
export const fetchMovieDetails = payload => (dispatch, getState) => {
  return dispatch({
    type: 'FETCH_MOVIE_DETAILS',
    payload: new Promise((resolve, reject) => TMDB_fetchDetails({ id: payload })
      .then(data => resolve(data.json()))
      .catch(error => reject(error))
    )
  })
}

/*
Fetch and receive wrappers (getters)
*/

export const FETCH_AND_RECEIVE_QUERY_META = 'FETCH_AND_RECEIVE_QUERY_META'
export const fetchAndReceiveQueryMeta = payload => (dispatch, getState) => {
  return dispatch({
    type: FETCH_AND_RECEIVE_QUERY_META,
    payload: dispatch(fetchQueryMeta({ ...payload }))
    .then(({ value, action })  => {
      return dispatch(receiveQueryMeta({ ...value }))
    })
  })
}

export const FETCH_AND_RECEIVE_RANDOM_MOVIE = 'FETCH_AND_RECEIVE_RANDOM_MOVIE'
export const fetchAndReceiveRandomMovie = payload => (dispatch, getState) => {
  return dispatch({
    type: FETCH_AND_RECEIVE_RANDOM_MOVIE,
    payload: dispatch(fetchMovies({ ...payload }))
    .then(({ value, action }) => {
      return dispatch(receiveMovie(randomItem(value.results)))
    })
  })
}

export const TRY_FOR_TRAILER = 'TRY_FOR_TRAILER'
export const tryForTrailer = payload => (dispatch, getState) => {
  return dispatch({
    type: TRY_FOR_TRAILER,
    payload: dispatch(fetchAndReceiveRandomMovie({ ...payload }))
    .then(data => {
      dispatch(fetchMovieDetails(getState().player.currentMovieId))
      .then(({ value, action }) => {
        if (value.videos.results.length) {
          return dispatch(receiveMovieDetails(value))
        } else {
          return dispatch(tryForTrailer({ ...payload }))
        }
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
    payload: dispatch(setGenre(payload))
    .then(() => {
      return dispatch(queryForMovies({
        genre: getState().player.genre,
        years: getState().player.years
      }))
    })
  })
}

export const SET_YEARS_AND_QUERY = 'SET_YEARS_AND_QUERY'
export const setYearsAndQuery = payload => (dispatch, getState) => {
  return dispatch({
    type: 'SET_YEARS_AND_QUERY',
    payload: dispatch(setYears(payload))
    .then(() => {
      return dispatch(queryForMovies({
        genre: getState().player.genre,
        years: getState().player.years
      }))
    })
  })
}

export const QUERY_FOR_MOVIES = 'QUERY_FOR_MOVIES'
export const queryForMovies = payload => (dispatch, getState) => {
  return dispatch({
    type: 'QUERY_FOR_MOVIES',
    payload: dispatch(fetchAndReceiveQueryMeta({ ...payload }))
    .then(() => {
      return dispatch(tryForTrailer({
        pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
        genre: getState().player.genre,
        years: getState().player.years
      }))
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
      payload: dispatch(fetchAndReceiveRandomMovie({
        pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
        genre: getState().player.genre,
        years: getState().player.years
      }))
      .then(() => {
        return dispatch(tryForTrailer({
          pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
          genre: getState().player.genre,
          years: getState().player.years
        }))
      })
    })
  } else {
    return dispatch({
      type: 'NEXT_MOVIE',
      payload: dispatch(queueForward())
    })
  }
}

export const PREVIOUS_MOVIE = 'PREVIOUS_MOVIE'
export const previousMovie = payload => (dispatch, getState) => {
  return dispatch({
    type: 'PREVIOUS_MOVIE',
    payload: dispatch(queueBackward())
  })
}
