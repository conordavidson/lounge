export const SET_QUERY = 'SET_QUERY'
export const setQuery = payload => {
  return {
    type: SET_QUERY,
    payload
  }
}

export const SET_QUERY_META = 'SET_QUERY_META'
export const SET_MOVIE = 'SET_MOVIE'
export const FETCH_TRAILER_PENDING = 'FETCH_TRAILER_PENDING'

export const QUEUE_FORWARD = 'QUEUE_FORWARD'
export const QUEUE_BACKWARD = 'QUEUE_BACKWARD'
export const queueBackward = () => {
  return { type: QUEUE_BACKWARD }
}

export const NEXT_MOVIE = 'NEXT_MOVIE'
export const nextMovie = payload => {
  return {
    type: NEXT_MOVIE,
    payload
  }
}

export const START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT = 'START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT'
export const END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT = 'END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT'


export const PLAY_YOUTUBE_PLAYER = 'PLAY_YOUTUBE_PLAYER'
export const PAUSE_YOUTUBE_PLAYER = 'PAUSE_YOUTUBE_PLAYER'
export const TOGGLE_PLAY_PAUSE = 'TOGGLE_PLAY_PAUSE'
export const togglePlayPause = payload => {
  return {
    type: TOGGLE_PLAY_PAUSE,
    payload
  }
}

export const SET_YOUTUBE_PLAYER_INSTANCE = 'SET_YOUTUBE_PLAYER_INSTANCE'
export const setYoutubePlayerInstance = payload => {
  return {
    type: SET_YOUTUBE_PLAYER_INSTANCE,
    payload
  }
}
