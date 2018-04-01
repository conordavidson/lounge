import React, { Component } from 'react';
import Genres from '../../external/themoviedb/genres.js'

class Query extends Component {
  genreDropdown() {
    return Object.keys(Genres).map(genreName => {
      const genreId = Genres[genreName]
      return (
        <li
          className={genreId === this.props.genre ? 'active' : null}
          key={genreId}
          onClick={() => this.props.setGenreAndQuery(genreId)}
        >
          {genreName}
        </li>
      )
    })
  }

  render() {
    return (
      <ul>{this.genreDropdown()}</ul>
    )
  }
}

export default Query;
