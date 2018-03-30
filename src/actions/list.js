export const SAVE_MOVIE = 'SAVE_MOVIE';
export const saveMovie = payload => {
  return {
    type: SAVE_MOVIE,
    payload
  };
}
