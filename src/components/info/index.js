import React, { Component } from 'react'
import './style.css'

class Info extends Component {
  currentMovie() {
    return this.props.movies[this.props.currentMovieId]
  }

  directors() {
    const directors = this.currentMovie().directors.reduce((result, director, index) => {
      return index === 0 ? result + director.name : result + `, ${director.name}`
    }, ``)

    return `Directed By: ${directors}`
  }

  render() {
    return (
      <div className={`info_component`}>
        {this.props._STATUS_INITIALIZED && !this.props._STATUS_LOADING ?
          <div>
            <mark className={`info_component--icon`} />
            <p className={`info_component--title`}>{this.currentMovie().title}</p>
            <p className={`info_component--directors`}>{this.directors()}</p>
            <p className={`info_component--release_date`}>{this.currentMovie().release_date}</p>
          </div>
        :
          null
        }
      </div>
    )
  }
}

export default Info;
