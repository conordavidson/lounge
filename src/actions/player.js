import { fetchMovies, fetchDetails } from '../external/themoviedb/queries'
import randomItem from '../utils/randomItem'

export const SET_GENRE_AND_QUERY = 'SET_GENRE_AND_QUERY'
export const setGenreAndQuery = payload => (dispatch, getState) => {
  dispatch(fetchPending())
  dispatch(setGenre(payload))
  dispatch(queryForMovies({
    genre: getState().player.genre,
    years: getState().player.years
  }))
  .then(() => dispatch(fetchSuccess()))
}

export const SET_GENRE = 'SET_GENRE'
export const setGenre = payload => {
  return {
    type: SET_GENRE,
    payload
  }
}

export const SET_YEARS_AND_QUERY = 'SET_YEARS_AND_QUERY'
export const setYearsAndQuery = payload => (dispatch, getState) => {
  dispatch(fetchPending())
  dispatch(setYears(payload))
  dispatch(queryForMovies({
    genre: getState().player.genre,
    years: getState().player.years
  }))
  .then(() => dispatch(fetchSuccess()))
}

export const SET_YEARS = 'SET_YEARS'
export const setYears = payload => {
  return {
    type: SET_YEARS,
    payload
  }
}

export const QUERY_FOR_MOVIES = 'QUERY_FOR_MOVIES'
export const queryForMovies = payload => (dispatch, getState) => {
  return dispatch(fetchQueryMeta({ ...payload }))
  .then(() => {
    return dispatch(fetchRandomMovieFromPage({
      pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
      genre: getState().player.genre,
      years: getState().player.years
    }))
  })
  .then(() => {
    return dispatch(fetchMovieDetails(getState().player.currentMovieId))
  })
  .then(() => {
    dispatch(initizationSuccess())
  })
}

export const FETCH_QUERY_META = 'FETCH_QUERY_META'
export const fetchQueryMeta = payload => (dispatch, getState) => {
  return fetchMovies({
    genre: getState().player.genre,
    years: getState().player.years,
    pageNumber: 1
  })
  .then(
    response => response.json(),
    error => console.log('ERROR FETCHING MOVIES', error)
  )
  .then(data =>
    dispatch(receiveQueryMeta({
      ...data,
      ...payload
    }))
  )
}

export const RECEIVE_QUERY_META = 'RECEIVE_QUERY_META'
export const receiveQueryMeta = payload => {
  return {
    type: RECEIVE_QUERY_META,
    payload
  }
}


export const FETCH_RANDOM_MOVIE_FROM_PAGE = 'FETCH_RANDOM_MOVIE_FROM_PAGE'
export const fetchRandomMovieFromPage = payload => dispatch => {
  return fetchMovies({
    genre: payload.genre,
    years: payload.years,
    pageNumber: payload.pageNumber
  })
  .then(
    response => response.json(),
    error => console.log('ERROR FETCHING MOVIES', error)
  )
  .then(data => {
    return dispatch(receiveMovie(randomItem(data.results)))
  })
}

export const RECEIVE_MOVIE = 'RECEIVE_MOVIE'
export const receiveMovie = payload => {
  return {
    type: RECEIVE_MOVIE,
    payload
  }
}

export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS'
export const fetchMovieDetails = payload => (dispatch, getState) => {
  return fetchDetails({ id: payload })
  .then(
    response => response.json(),
    error => console.log('ERROR FETCHING MOVIE TRAILER', error)
  )
  .then(data => {
    if (data.videos.results.length) {
      return dispatch(receiveMovieDetails(data))
    } else {
      return dispatch(fetchRandomMovieFromPage({
        pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
        genre: getState().player.genre,
        years: getState().player.years
      }))
      .then(() => {
        return dispatch(fetchMovieDetails(getState().player.currentMovieId))
      })
    }
  })
}

export const RECEIVE_MOVIE_DETAILS = 'RECEIVE_MOVIE_DETAILS';
export const receiveMovieDetails = payload => {
  return {
    type: RECEIVE_MOVIE_DETAILS,
    payload
  }
}

export const NEXT_MOVIE = 'NEXT_MOVIE'
export const nextMovie = payload => (dispatch, getState) => {
  const queuePosition = getState().player.queue.findIndex(id => {
    return id === getState().player.currentMovieId
  })
  if (queuePosition === getState().player.queue.length - 1) {
    dispatch(fetchPending())
    return dispatch(fetchRandomMovieFromPage({
      pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
      genre: getState().player.genre,
      years: getState().player.years
    }))
    .then(() => {
      return dispatch(fetchMovieDetails(getState().player.currentMovieId))
    })
    .then(() => {
      return dispatch(fetchSuccess())
    })
  } else {
    dispatch(queueForward())
  }
}

export const PREVIOUS_MOVIE = 'PREVIOUS_MOVIE'
export const previousMovie = payload => (dispatch, getState) => {
  dispatch(queueBackward())
}

export const QUEUE_FORWARD = 'QUEUE_FORWARD'
export const queueForward = () => {
  return {
    type: QUEUE_FORWARD
  }
}

export const QUEUE_BACKWARD = 'QUEUE_BACKWARD'
export const queueBackward = () => {
  return {
    type: QUEUE_BACKWARD
  }
}

export const INITIALIZATION_SUCCESS = 'INITIALIZATION_SUCCESS'
export const initizationSuccess = () => {
  return {
    type: INITIALIZATION_SUCCESS
  }
}

export const FETCH_PENDING = 'FETCH_PENDING'
export const fetchPending = () => {
  return {
    type: FETCH_PENDING
  }
}

export const FETCH_SUCCESS = 'FETCH_SUCCESS'
export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  }
}
