import React, { Component } from 'react'
import YouTube from 'react-youtube'
import './style.css';

class Player extends Component {
  currentMovie() {
    return this.props.movies[this.props.currentMovieId]
  }

  render() {
    return (
      <div className={`player_component`}>
        {this.props._STATUS_INITIALIZED && !this.props._STATUS_LOADING ?
          <div className={`player`}>
            <YouTube
              videoId = {this.currentMovie().trailer.key}
              opts = {{
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
        :
          <div>
            LOADING...
          </div>
        }
      </div>
    )
  }
}

export default Player;
