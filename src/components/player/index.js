import React, { Component } from 'react'
import YouTube from 'react-youtube'
import './style.css'

class Player extends Component {
  render() {
    const {
      _STATUS_INITIALIZED,
      _STATUS_LOADING,
      currentMovie,
      trailerFetchDifficulty,
      actions: { nextMovie }
    } = this.props
    if (trailerFetchDifficulty) {
      return (<div>problem</div>)
    }
    return (
      <div className={`PlayerComponent`}>
        {_STATUS_INITIALIZED && !_STATUS_LOADING ? (
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
        ) : (
          <div className={`PlayerComponent__text`}>LOADING...</div>
        )}
      </div>
    )
  }
}

export default Player
