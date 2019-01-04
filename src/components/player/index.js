import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { throttle } from 'throttle-debounce'
import YouTube from 'react-youtube'
import cx from 'classnames'
import BouncingText from 'components/BouncingText'
import { hideCursor, showCursor } from 'utils/toggleCursorVisibility'
import { INTERMISSION, LOADING, TRAILER, HOME } from 'constants/PlayerViews'
import { SPACE_BAR, TRAILER_FINISHED } from 'external/mixpanel/properties'
import './style.css'

class Player extends Component {
  componentDidMount() {
    const { actions: { detectTouchScreen } } = this.props
    detectTouchScreen('ontouchstart' in window || !!navigator.maxTouchPoints)
    document.addEventListener('keypress', this.togglePausePlayVideo)
  }

  intermissionView() {
    return (
      <div key={'intermissionView'} className={`PlayerComponent__text`}>
        <div className={`IntermissionView`}>
          <mark className={`Counter`}>
            <mark className={`Counter__arc`}/>
          </mark>
          <BouncingText className={`IntermissionView__title`} text="INTERMISSION" />
          <p>
            {`We're experiencing difficulties retrieving trailers within your
            search criteria. Try selecting a different genre and/or time period
            after the brief intermission.`}
          </p>
        </div>
      </div>
    )
  }

  loadingView() {
    return (
      <div key={'loadingView'} className={`PlayerComponent__text`}>
        <BouncingText className={`Loading`} text="LOADING" />
      </div>
    )
  }

  homeView() {
    return (
      <div key={'homeView'} className={`PlayerComponent__text`}>
        <div className={`HomeView`}>
          <h6>Welcome to the</h6>
          <BouncingText className={`HomeView__title`} text="MIDNIGHT THEATER" />
          <p>
            Select a genre and/or time period to begin your viewing experience
          </p>
        </div>
      </div>
    )
  }

  trailerView() {
    const {
      controlsDisplayed,
      currentMovie,
      actions: { nextMovie, setYoutubePlayerInstance }
    } = this.props

    controlsDisplayed ? showCursor() : hideCursor()

    return (
      <div
        className={`PlayerComponent__trailer-view`}
        key={currentMovie.trailer.key}
      >
        <YouTube
          videoId={currentMovie.trailer.key}
          onEnd={() => nextMovie(TRAILER_FINISHED)}
          onReady={e => setYoutubePlayerInstance(e.target)}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
              controls: 0,
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

  togglePausePlayVideo = e => {
    const { actions: { togglePlayPause } } = this.props
    if (e.code !== 'Space') return
    togglePlayPause(SPACE_BAR)
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
    const {
      controlsDisplayed,
      currentPlayerView,
      actions: { startControlDisplayTimeout }
    } = this.props

    const classes = cx('PlayerComponent', {
      'PlayerComponent--controls-hidden':
        !controlsDisplayed && currentPlayerView === TRAILER
    })

    return (
      <div
        className={classes}
        onMouseMove={throttle(250, startControlDisplayTimeout)}
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
