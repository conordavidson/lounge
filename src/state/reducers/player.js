import {
  SET_GENRE,
  SET_YEARS,
  QUEUE_FORWARD,
  QUEUE_BACKWARD,
  RECEIVE_QUERY_META,
  RECEIVE_MOVIE,
  RECEIVE_MOVIE_DETAILS,
  FETCH_QUERY_META,
  FETCH_MOVIES,
  FETCH_MOVIE_DETAILS,
  UNSUCCESSFUL_TRAILER_ATTEMPT,
  SUCCESSFUL_TRAILER_ATTEMPT,
  TRAILER_FETCH_DIFFICULTY,
  END_TRAILER_FETCH_TIMEOUT
} from '../actions'

export const initialState = {
  initialized: false,
  loading: false,
  queue: [],
  movies: {},
  currentMovieId: null,
  pageNumber: null,
  totalPages: null,
  genre: null,
  years: {
    min: null,
    max: null
  },
  unsuccessfulTrailerAttempts: 0,
  trailerFetchDifficulty: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${SET_GENRE}_FULFILLED`:
      return {
        ...state,
        genre: action.payload
      }
    case `${SET_YEARS}_FULFILLED`:
      return {
        ...state,
        years: {
          min: action.payload.min,
          max: action.payload.max
        }
      }
    case `${QUEUE_FORWARD}_FULFILLED`:
      return {
        ...state,
        currentMovieId:
          state.queue[
            state.queue.findIndex(id => id === state.currentMovieId) + 1
          ]
      }
    case `${QUEUE_BACKWARD}_FULFILLED`:
      return {
        ...state,
        currentMovieId:
          state.queue[
            state.queue.findIndex(id => id === state.currentMovieId) - 1
          ]
      }
    case `${UNSUCCESSFUL_TRAILER_ATTEMPT}_FULFILLED`:
      return {
        ...state,
        unsuccessfulTrailerAttempts: state.unsuccessfulTrailerAttempts + 1
      }
    case `${SUCCESSFUL_TRAILER_ATTEMPT}_FULFILLED`:
      return {
        ...state,
        unsuccessfulTrailerAttempts: 0
      }
    case `${TRAILER_FETCH_DIFFICULTY}_FULFILLED`:
      return {
        ...state,
        trailerFetchDifficulty: true,
      }
    case `${END_TRAILER_FETCH_TIMEOUT}_FULFILLED`:
      return {
        ...state,
        trailerFetchDifficulty: false,
        unsuccessfulTrailerAttempts: 0
      }
    case `${RECEIVE_QUERY_META}_FULFILLED`:
      return {
        ...state,
        pageNumber: action.payload.page,
        totalPages: action.payload.total_pages,
        genre: action.payload.genre,
        years: action.payload.years
      }
    case `${RECEIVE_MOVIE}_FULFILLED`:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.id]: action.payload
        },
        currentMovieId: action.payload.id
      }
    case `${RECEIVE_MOVIE_DETAILS}_FULFILLED`:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.id]: {
            ...state.movies[action.payload.id],
            trailer: action.payload.videos.results[0],
            directors: action.payload.credits.crew.filter(member => {
              return member.job === 'Director'
            })
          }
        },
        queue: state.queue.concat([action.payload.id]),
        initialized: true,
        loading: false
      }
    case `${FETCH_QUERY_META}_PENDING`:
      return {
        ...state,
        loading: true
      }
    case `${FETCH_MOVIES}_PENDING`:
      return {
        ...state,
        loading: true
      }
    case `${FETCH_MOVIE_DETAILS}_PENDING`:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}
