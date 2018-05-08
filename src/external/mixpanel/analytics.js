export const user_id = 'user_id'
export const movie_id = 'movie_id'
export const movie_title = 'movie_title'
export const movie_youtube_key = 'movie_youtube_key'
export const genre = 'genre'
export const time_period = 'time_period'
export const key = 'key'
export const type = 'type'

export const ENTER_SITE = {
  title: 'ENTER_SITE',
  args: []
}
export const LEAVE_SITE = {
  title: 'LEAVE_SITE',
  args: []
}
export const SAVE_MOVIE = {
  title: 'SAVE_MOVIE',
  args: [movie_id, movie_title, movie_youtube_key]
}
export const DELETE_MOVIE = {
  title: 'DELETE_MOVIE',
  args: [movie_id, movie_title, movie_youtube_key]
}
export const SET_QUERY = {
  title: 'SET_QUERY',
  args: [genre, time_period]
}
export const NEXT_MOVIE = {
  title: 'NEXT_MOVIE',
  args: [type]
}
export const PREV_MOVIE = {
  title: 'PREV_MOVIE',
  args: []
}
export const TOGGLE_PLAY_PAUSE = {
  title: 'TOGGLE_PLAY_PAUSE',
  args: [key]
}

export default [
  ENTER_SITE,
  LEAVE_SITE,
  SAVE_MOVIE,
  DELETE_MOVIE,
  SET_QUERY,
  NEXT_MOVIE,
  PREV_MOVIE,
  TOGGLE_PLAY_PAUSE
]
