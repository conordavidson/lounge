let controlDisplayTimer

export const START_CONTROL_DISPLAY_TIMEOUT = 'START_CONTROL_DISPLAY_TIMEOUT'
export const startControlDisplayTimeout = () => dispatch => {
  clearTimeout(controlDisplayTimer)
  controlDisplayTimer = setTimeout(
    () => dispatch(endControlDisplayTimeout()),
    4000
  )
  return dispatch({
    type: START_CONTROL_DISPLAY_TIMEOUT
  })
}

export const END_CONTROL_DISPLAY_TIMEOUT = 'END_CONTROL_DISPLAY_TIMEOUT'
export const endControlDisplayTimeout = () => {
  return {
    type: END_CONTROL_DISPLAY_TIMEOUT
  }
}

export const CANCEL_CONTROL_DISPLAY_TIMEOUT = 'CANCEL_CONTROL_DISPLAY_TIMEOUT'
export const cancelControlDisplayTimeout = () => dispatch => {
  clearTimeout(controlDisplayTimer)
  return dispatch({
    type: CANCEL_CONTROL_DISPLAY_TIMEOUT
  })
}
