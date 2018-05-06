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
export const nextMovie = () => {
  return { type: NEXT_MOVIE }
}

export const START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT = 'START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT'
export const END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT = 'END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT'
