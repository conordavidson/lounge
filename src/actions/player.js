import THEMOVIEDB_KEY from '../external/themoviedb/key'
import randomItem from '../utils/randomItem'

export const QUERY_FOR_MOVIES = 'QUERY_FOR_MOVIES'
export const queryForMovies = payload => (dispatch, getState) => {
  return dispatch(fetchQueryMeta({
    genre: payload.genre,
    year: payload.year
  }))
  .then(() => {
    return dispatch(fetchRandomMovieFromPage({
      pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
      genre: getState().player.genre,
      year: getState().player.year
    }))
  })
  .then(() => {
    return dispatch(fetchMovieTrailer(getState().player.currentMovieId))
  })
  .then(() => {
    dispatch(initizationSuccess())
    dispatch(fetchSuccess())
  })
}

export const FETCH_QUERY_META = 'FETCH_QUERY_META'
export const fetchQueryMeta = payload => dispatch => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${THEMOVIEDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${payload.genre}&year=${payload.year}`)
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
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${THEMOVIEDB_KEY}&language=en-US&sort_by=original_title.asc&include_adult=false&include_video=false&page=${payload.pageNumber}&with_genres=${payload.genre}&year=${payload.year}`)
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

export const FETCH_MOVIE_TRAILER = 'FETCH_MOVIE_TRAILER'
export const fetchMovieTrailer = payload => (dispatch, getState) => {
  return fetch(`https://api.themoviedb.org/3/movie/${payload}/videos?api_key=${THEMOVIEDB_KEY}`)
    .then(
      response => response.json(),
      error => console.log('ERROR FETCHING MOVIE TRAILER', error)
    )
    .then(data => {
      if (data.results.length) {
        return dispatch(receiveMovieTrailer(data))
      } else {
        return dispatch(fetchRandomMovieFromPage({
          pageNumber: Math.floor(Math.random() * getState().player.totalPages) + 1,
          genre: getState().player.genre,
          year: getState().player.year
        }))
        .then(() => {
          return dispatch(fetchMovieTrailer(getState().player.currentMovieId))
        })
      }
    })
}

export const RECEIVE_MOVIE_TRAILER = 'RECEIVE_MOVIE_TRAILER';
export const receiveMovieTrailer = payload => {
  return {
    type: RECEIVE_MOVIE_TRAILER,
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
      year: getState().player.year
    }))
    .then(() => {
      return dispatch(fetchMovieTrailer(getState().player.currentMovieId))
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
