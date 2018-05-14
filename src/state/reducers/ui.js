import {
  START_CONTROL_DISPLAY_TIMEOUT,
  END_CONTROL_DISPLAY_TIMEOUT,
  DETECT_TOUCH_SCREEN
} from 'state/actions'

export const initialState = {
  controlsDisplayed: true,
  isTouchScreen: false
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
    case DETECT_TOUCH_SCREEN:
      return {
        ...state,
        isTouchScreen: action.payload
      }
    default:
      return state
  }
}
