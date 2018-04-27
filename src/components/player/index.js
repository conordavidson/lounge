import React, { Component } from 'react'
import YouTube from 'react-youtube'
import './style.css'

class Player extends Component {
  render() {
    const { _STATUS_INITIALIZED, _STATUS_LOADING, currentMovie } = this.props
    return (
      <div className={`PlayerComponent`}>
        {_STATUS_INITIALIZED && !_STATUS_LOADING ? (
          <div className={`PlayerComponent__player`}>
            <YouTube
              videoId={currentMovie.trailer.key}
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
        ) : (
          <div>LOADING...</div>
        )}
      </div>
    )
  }
}

export default Player
