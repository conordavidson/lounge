import {
  QUEUE_FORWARD, QUEUE_BACKWARD, RECEIVE_MOVIES, RECEIVE_MOVIE_TRAILER,
  INITIALIZATION_SUCCESS, FETCH_PENDING, FETCH_SUCCESS
} from '../actions'
import randomizeArray from '../utils/randomizeArray'

export const initialState = {
  _STATUS_INITIALIZED: false,
  _STATUS_IS_FETCHING: true,
  queue: [],
  movies: {},
  currentMovieId: null,
  pageNumber: null,
  totalPages: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case QUEUE_FORWARD:
      return {
        ...state,
        currentMovieId: state.queue[
          state.queue.findIndex(id => id === state.currentMovieId) + 1
        ]
      }
    case QUEUE_BACKWARD:
      return {
        ...state,
        currentMovieId: state.queue[
          state.queue.findIndex(id => id === state.currentMovieId) - 1
        ]
      }
    case RECEIVE_MOVIES:
      const queue = randomizeArray(action.payload.results).map(movie => movie.id)
      return {
        ...state,
        movies: action.payload.results.reduce((moviesObject, movie) => {
          moviesObject[movie.id] = movie
          return moviesObject
        }, {}),
        queue,
        currentMovieId: queue[0]
      }
    case RECEIVE_MOVIE_TRAILER:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.id]: {
            ...state.movies[action.payload.id],
            trailer: action.payload.results[0]
          }
        }
      }
    case INITIALIZATION_SUCCESS:
      return {
        ...state,
        _STATUS_INITIALIZED: true
      }
    case FETCH_PENDING:
      return {
        ...state,
        _STATUS_IS_FETCHING: true
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        _STATUS_IS_FETCHING: false
      }
    default:
      return state;
  }
};
