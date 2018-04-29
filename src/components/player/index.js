import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { debounce } from 'throttle-debounce'
import YouTube from 'react-youtube'
import BouncingText from 'components/BouncingText'
import { hideCursor, showCursor } from 'utils/toggleCursorVisibility'
import { INTERMISSION, LOADING, TRAILER, HOME } from 'constants/PlayerViews'
import './style.css'

class Player extends Component {
  intermissionView() {
    return (
      <div key={'intermissionView'} className={`PlayerComponent__text`}>
        <BouncingText text="INTERMISSION" />
      </div>
    )
  }

  loadingView() {
    return (
      <div key={'loadingView'} className={`PlayerComponent__text`}>
        <BouncingText text="LOADING" />
      </div>
    )
  }

  homeView() {
    return (
      <div key={'homeView'} className={`PlayerComponent__text`}>
        <div className={`HomeView`}>
          <span role="img" aria-label="martini">🍸</span>
          <br />
          <h6>WELCOME TO THE</h6>
          <br />
          <br />
          <BouncingText text="THE EMERALD LOUNGE" />
          <br />
          <p>
            SELECT A GENRE AND/OR TIME RANGE TO BEGIN YOUR VIEWING EXPERIENCE
          </p>
        </div>
      </div>
    )
  }

  trailerView() {
    const {
      controlsDisplayed,
      currentMovie,
      actions: { nextMovie }
    } = this.props

    controlsDisplayed ? showCursor() : hideCursor()

    return (
      <div
        className={`PlayerComponent__trailer-view`}
        key={currentMovie.trailer.key}
      >
        <YouTube
          videoId={currentMovie.trailer.key}
          onEnd={nextMovie}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
              controls: 1,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              fs: 0
            }
          }}
        />
      </div>
    )
  }

  viewSwitch() {
    const { currentPlayerView } = this.props
    switch (currentPlayerView) {
      case INTERMISSION:
        return this.intermissionView()
      case LOADING:
        return this.loadingView()
      case TRAILER:
        return this.trailerView()
      case HOME:
        return this.homeView()
      default:
        return this.loadingView()
    }
  }

  render() {
    const { actions: { startControlDisplayTimeout } } = this.props

    return (
      <div
        className={`PlayerComponent`}
        onMouseMove={debounce(50, startControlDisplayTimeout)}
      >
        <CSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppear={true}
          transitionAppearTimeout={1000}
        >
          {this.viewSwitch()}
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default Player
