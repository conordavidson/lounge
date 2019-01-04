import {
  SET_QUERY,
  SET_QUERY_META,
  SET_MOVIE,
  QUEUE_FORWARD,
  QUEUE_BACKWARD,
  START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT,
  END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT,
  FETCH_TRAILER_PENDING,
  SET_YOUTUBE_PLAYER_INSTANCE,
  PLAY_YOUTUBE_PLAYER,
  PAUSE_YOUTUBE_PLAYER,
} from '../actions'

export const initialState = {
  initialized: false,
  loading: false,
  queue: [],
  movies: {},
  currentMovieId: null,
  totalPages: null,
  genre: 'ALL',
  years: {
    min: null,
    max: null,
  },
  trailerFetchDifficulty: false,
  paused: true,
  youtubePlayerInstance: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERY:
      return {
        ...state,
        genre: action.payload.genre,
        years: action.payload.years,
      }
    case SET_QUERY_META:
      return {
        ...state,
        totalPages: action.payload.total_pages,
      }
    case SET_MOVIE:
      return {
        ...state,
        movies: {
          ...state.movies,
          [action.payload.id]: {
            ...action.payload,
            trailer: action.payload.videos.results[0],
            directors: action.payload.credits.crew.filter(member => {
              return member.job === 'Director'
            }),
          },
        },
        queue: state.queue.concat([action.payload.id]),
        currentMovieId: action.payload.id,
        initialized: true,
        loading: false,
        paused: false,
      }
    case QUEUE_FORWARD:
      return {
        ...state,
        currentMovieId: state.queue[state.queue.findIndex(id => id === state.currentMovieId) + 1],
        paused: false,
      }
    case QUEUE_BACKWARD:
      return {
        ...state,
        currentMovieId: state.queue[state.queue.findIndex(id => id === state.currentMovieId) - 1],
        paused: false,
      }
    case START_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT:
      return {
        ...state,
        trailerFetchDifficulty: true,
      }
    case END_UNSUCCESSFUL_TRAILER_ATTEMPT_TIMEOUT:
      return {
        ...state,
        trailerFetchDifficulty: false,
        loading: false,
      }
    case FETCH_TRAILER_PENDING:
      return {
        ...state,
        loading: true,
      }
    case SET_YOUTUBE_PLAYER_INSTANCE:
      return {
        ...state,
        youtubePlayerInstance: action.payload,
      }
    case PLAY_YOUTUBE_PLAYER:
      return {
        ...state,
        paused: false,
      }
    case PAUSE_YOUTUBE_PLAYER:
      return {
        ...state,
        paused: true,
      }
    default:
      return state
  }
}
