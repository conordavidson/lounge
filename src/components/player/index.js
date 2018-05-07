import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { throttle } from 'throttle-debounce'
import YouTube from 'react-youtube'
import cx from 'classnames'
import BouncingText from 'components/BouncingText'
import { hideCursor, showCursor } from 'utils/toggleCursorVisibility'
import { INTERMISSION, LOADING, TRAILER, HOME } from 'constants/PlayerViews'
import './style.css'

class Player extends Component {
  componentDidMount() {
    document.addEventListener("keypress", this.togglePausePlayVideo);
  }

  intermissionView() {
    return (
      <div key={'intermissionView'} className={`PlayerComponent__text`}>
        <BouncingText className={`Intermission`} text="INTERMISSION" />
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
          <span role="img" aria-label="martini">🍸</span>
          <br /><br />
          <h6>WELCOME TO THE</h6>
          <br />
          <br />
          <BouncingText className={`HomeView__title`} text="MIDNIGHT THEATER" />
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
          onEnd={nextMovie}
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
    togglePlayPause()
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
      'PlayerComponent--controls-hidden': !controlsDisplayed  && currentPlayerView === TRAILER
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
