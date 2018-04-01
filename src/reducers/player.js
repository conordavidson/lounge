import {
  SET_GENRE, SET_YEAR, QUEUE_FORWARD, QUEUE_BACKWARD, RECEIVE_QUERY_META,
  RECEIVE_MOVIE, RECEIVE_MOVIE_TRAILER, INITIALIZATION_SUCCESS, FETCH_PENDING,
  FETCH_SUCCESS
} from '../actions'

export const initialState = {
  _STATUS_INITIALIZED: false,
  _STATUS_IS_FETCHING: false,
  queue: [],
  movies: {},
  currentMovieId: null,
  pageNumber: null,
  totalPages: null,
  genre: null,
  year: 2017
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GENRE:
      return {
        ...state,
        genre: action.payload
      }
    case SET_YEAR:
      return {
        ...state,
        year: action.payload
      }
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
    case RECEIVE_QUERY_META:
      return {
        ...state,
        pageNumber: action.payload.page,
        totalPages: action.payload.total_pages,
        genre: action.payload.genre,
        year: action.payload.year
      }
    case RECEIVE_MOVIE:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.id]: action.payload
        },
        currentMovieId: action.payload.id
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
        },
        queue: state.queue.concat([action.payload.id]),
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
