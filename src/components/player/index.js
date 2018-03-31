import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Player extends Component {
  componentDidMount() {
    this.props.queryForMovies({
      genre: 99,
      year: 2010
    });
  }

  render() {
    const currentMovie = () => this.props.movies[this.props.currentMovieId]

    return (
      <div>
        {this.props._STATUS_INITIALIZED && !this.props._STATUS_IS_FETCHING ?
          <div>
            <YouTube
              videoId = {currentMovie().trailer.key}
              opts = {{
                width: '1080',
                height: '720',
                playerVars: {
                  autoplay: 1
                }
              }}
            />
          <a onClick = {() => this.props.nextMovie()}>NEXT</a>
            <br/>
          <a onClick = {() => this.props.previousMovie()}>PREV</a>
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
