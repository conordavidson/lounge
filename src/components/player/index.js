import React, { Component } from 'react'
import YouTube from 'react-youtube'

class Player extends Component {
  currentMovie() {
    return this.props.movies[this.props.currentMovieId]
  }

  render() {
    return (
      <div>
        {this.props._STATUS_INITIALIZED && !this.props._STATUS_IS_FETCHING ?
          <div>
            <YouTube
              videoId = {this.currentMovie().trailer.key}
              opts = {{
                width: '1080',
                height: '720',
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
            <a onClick = {() => this.props.nextMovie()}>NEXT</a>
              <br/>
            <a onClick = {() => this.props.previousMovie()}>PREV</a>
            <p>{this.currentMovie().title}</p>
            <p>{JSON.stringify(this.currentMovie().directors)}</p>
            <p>{this.currentMovie().release_date}</p>
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
