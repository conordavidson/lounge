import { SAVE_MOVIE } from '../actions'

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
    default:
      return state
  }
}
