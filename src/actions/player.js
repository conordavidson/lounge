import THEMOVIEDB_KEY from '../external/themoviedb/key'

export const NEXT_MOVIE = 'NEXT_MOVIE'
export const nextMovie = () => {
  return {
    type: NEXT_MOVIE
  };
}

export const PREVIOUS_MOVIE = 'PREVIOUS_MOVIE'
export const previousMovie = () => {
  return {
    type: PREVIOUS_MOVIE
  };
}

export const FETCH_MOVIES = 'FETCH_MOVIES'
export const fetchMovies = payload => dispatch => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${THEMOVIEDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&year=2010`)
    .then(
      response => response.json(),
      error => console.log('ERROR FETCHING MOVIES', error)
    )
    .then(data =>
      dispatch(receiveMovies(data))
    )
}

export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
export const receiveMovies = payload => {
  return {
    type: RECEIVE_MOVIES,
    payload
  }
}

export const FETCH_MOVIE_TRAILER = 'FETCH_MOVIE_TRAILER'
export const fetchMovieTrailer = payload => dispatch => {
  return fetch(`https://api.themoviedb.org/3/movie/${payload}/videos?api_key=${THEMOVIEDB_KEY}`)
    .then(
      response => response.json(),
      error => console.log('ERROR FETCHING MOVIE TRAILER', error)
    )
    .then(data =>
      dispatch(receiveMovieTrailer(data))
    )
}

export const RECEIVE_MOVIE_TRAILER = 'RECEIVE_MOVIE_TRAILER';
export const receiveMovieTrailer = payload => {
  return {
    type: RECEIVE_MOVIE_TRAILER,
    payload
  }
}

export const FETCH_MOVIES_AND_TRAILER = 'FETCH_MOVIES_AND_TRAILER'
export const fetchMoviesAndTrailer = payload => (dispatch, getState) => {
  return dispatch(fetchMovies())
  .then(() =>
    dispatch(fetchMovieTrailer(getState().player.currentMovieId))
    .then(() =>
      dispatch(initizationSuccess())
    )
  )
}

export const INITIALIZATION_SUCCESS = 'INITIALIZATION_SUCCESS'
export const initizationSuccess = () => {
  return {
    type: INITIALIZATION_SUCCESS
  }
}
