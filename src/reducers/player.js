import {
  NEXT_MOVIE, PREVIOUS_MOVIE, RECEIVE_MOVIES, RECEIVE_MOVIE_TRAILER,
  INITIALIZATION_SUCCESS
} from '../actions'

export const initialState = {
  __STATUS__initialized: false,
  queue: [],
  movies: [],
  currentMovieId: null,
  pageNumber: null,
  totalPages: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEXT_MOVIE:
      return {
        ...state,
        currentMovieId: state.queue.findIndex(id => {
          return id === state.currentMovieId
        }) + 1
      }
    case PREVIOUS_MOVIE:
      return {
        ...state,
        currentMovieId: state.queue.findIndex(id => {
          return id === state.currentMovieId
        }) - 1
      }
    case RECEIVE_MOVIES:
      return {
        ...state,
        movies: action.payload.results,
        currentMovieId: action.payload.results[Math.floor(Math.random()*action.payload.results.length)].id
      }
    case RECEIVE_MOVIE_TRAILER:
      return {
        ...state,
        movies: state.movies.map(movie => {
          if (movie.id === action.payload.id) {
            return {
              ...movie,
              trailer: action.payload.results[0]
            }
          } else {
            return movie
          }
        })
      }
    case INITIALIZATION_SUCCESS:
      return {
        ...state,
        __STATUS__initialized: true
      }
    default:
      return state;
  }
};
