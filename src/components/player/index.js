import React, { Component } from 'react';
import YouTube from 'react-youtube';

class Player extends Component {
  componentDidMount() {
    this.props.fetchMoviesAndTrailer();
  }

  render() {
    const currentMovie = () => {
      return this.props.movies.find(movie => {
        return movie.id === this.props.currentMovieId
      })
    }

    return (
      <div>
        {this.props.__STATUS__initialized ?
          <YouTube
            videoId = {currentMovie().trailer.key}
            opts = {{
              height: '390',
              width: '640',
              playerVars: {
                autoplay: 1
              }
            }}
          />
        :
          null
        }
      </div>
    )
  }
}

export default Player;
