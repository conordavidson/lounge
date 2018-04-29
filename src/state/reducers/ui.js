import {
  START_CONTROL_DISPLAY_TIMEOUT,
  END_CONTROL_DISPLAY_TIMEOUT
} from 'state/actions'

export const initialState = {
  controlsDisplayed: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case START_CONTROL_DISPLAY_TIMEOUT:
      return {
        ...state,
        controlsDisplayed: true
      }
    case END_CONTROL_DISPLAY_TIMEOUT:
      return {
        ...state,
        controlsDisplayed: false
      }
    default:
      return state
  }
}
