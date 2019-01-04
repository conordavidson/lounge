import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { CSSTransitionGroup } from 'react-transition-group'
import currentPlayerView from 'state/selectors/currentPlayerView'
import { cancelControlDisplayTimeout } from 'state/actions'
import { TRAILER, HOME, INTERMISSION } from 'constants/PlayerViews'

const HideMe = ({
  children,
  controlsDisplayed,
  currentPlayerView,
  displayedOnHome,
  hiddenOnIntermission,
  hiddenOnHome,
  actions,
}) => {
  const { cancelControlDisplayTimeout } = actions
  const displayed = (() => {
    if (hiddenOnIntermission && currentPlayerView === INTERMISSION) return false
    if (displayedOnHome && currentPlayerView === HOME) return true
    if (hiddenOnHome && currentPlayerView === HOME) return false
    return controlsDisplayed
  })()

  return (
    <div onMouseEnter={cancelControlDisplayTimeout}>
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppear={true}
        transitionAppearTimeout={1000}
      >
        {displayed ? children : null}
      </CSSTransitionGroup>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentPlayerView: currentPlayerView(state),
    ...state.ui,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        cancelControlDisplayTimeout,
      },
      dispatch,
    ),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HideMe)
