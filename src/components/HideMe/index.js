import React from 'react'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import currentPlayerView from 'state/selectors/currentPlayerView'
import { TRAILER, HOME } from 'constants/PlayerViews'

const HideMe = ({ children, controlsDisplayed, currentPlayerView, displayedOnHome }) => {

  const displayed = (() => {
    if (displayedOnHome) {
      if (currentPlayerView === HOME) {
        return true
      } else {
        return controlsDisplayed;
      }
    } else {
      if (currentPlayerView === TRAILER) return controlsDisplayed;
    }
  })()

  return (
    <CSSTransitionGroup
      transitionName="fade"
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={1000}
      transitionAppear={true}
      transitionAppearTimeout={1000}
    >
      {displayed ? children : null}
    </CSSTransitionGroup>
  )
}

const mapStateToProps = state => {
  return {
    currentPlayerView: currentPlayerView(state),
    ...state.ui
  }
}

export default connect(mapStateToProps)(HideMe)
