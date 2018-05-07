import { SAVE_MOVIE, DELETE_MOVIE } from 'state/actions'

export const initialState = {
  savedMovies: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_MOVIE:
      return {
        ...state,
        savedMovies: {
          ...state.savedMovies,
          [action.payload.id]: action.payload
        }
      }
    case DELETE_MOVIE:
      return {
        ...state,
        savedMovies: {
          ...state.savedMovies,
          [action.payload]: undefined
        }
      }
    default:
      return state
  }
}
