export const SAVE_MOVIE = 'SAVE_MOVIE'
export const saveMovie = payload => {
  return {
    type: SAVE_MOVIE,
    payload
  }
}

export const DELETE_MOVIE = 'DELETE_MOVIE'
export const deleteMovie = payload => {
  return {
    type: DELETE_MOVIE,
    payload
  }
}
