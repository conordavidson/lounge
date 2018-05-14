export const START_CONTROL_DISPLAY_TIMEOUT = 'START_CONTROL_DISPLAY_TIMEOUT'
export const startControlDisplayTimeout = () => {
  return { type: START_CONTROL_DISPLAY_TIMEOUT }
}
export const END_CONTROL_DISPLAY_TIMEOUT = 'END_CONTROL_DISPLAY_TIMEOUT'
export const CANCEL_CONTROL_DISPLAY_TIMEOUT = 'CANCEL_CONTROL_DISPLAY_TIMEOUT'
export const cancelControlDisplayTimeout = () => {
  return { type: CANCEL_CONTROL_DISPLAY_TIMEOUT }
}
export const DETECT_TOUCH_SCREEN = 'DETECT_TOUCH_SCREEN'
export const detectTouchScreen = payload => {
  return {
    type: DETECT_TOUCH_SCREEN,
    payload
  }
}
