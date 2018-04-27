import React, { Component } from 'react'
import './style.css'

class Info extends Component {
  currentMovie() {
    const { movies, currentMovieId } = this.props;
    return movies[currentMovieId];
  }

  directors() {
    const directors = this.currentMovie().directors.reduce((result, director, index) => {
      return index === 0 ? result + director.name : result + `, ${director.name}`
    }, ``)

    return `Directed By: ${directors}`
  }

  render() {
    const { _STATUS_INITIALIZED, _STATUS_LOADING } = this.props;

    return (
      <div className={`InfoComponent`}>
        {_STATUS_INITIALIZED && !_STATUS_LOADING ?
          <div>
            <mark className={`InfoComponent__icon`} />
            <p className={`InfoComponent__title`}>{this.currentMovie().title}</p>
            <p className={`InfoComponent__directors`}>{this.directors()}</p>
            <p className={`InfoComponent__release_date`}>{this.currentMovie().release_date}</p>
          </div>
        :
          null
        }
      </div>
    )
  }
}

export default Info;
