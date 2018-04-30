import React, { Component } from 'react'
import HideMe from 'components/HideMe'
import './style.css'

export default class extends Component {

  directorNames(movie) {
    const directorNames = movie.directors.reduce(
      (result, director, index) => {
        return index === 0
          ? result + director.name
          : result + `, ${director.name}`
      },
      ``
    )
    return `Directed By: ${directorNames}`
  }

  list() {
    const { savedMovies } = this.props

    return Object.values(savedMovies).map(movie => (
      <li key={movie.id} className={`ListItem`}>
        <div className={`ListItem__title`}>{movie.title}</div>
        <div className={`ListItem__info`}>
          {this.directorNames(movie)}
        </div>
      </li>
    ))
  }

  render() {
    const { currentMovie, actions: { saveMovie } } = this.props

    return (
      <HideMe>
        <div className={`List`}>
          <div
            className={`List__add-icon`}
            onClick={() => saveMovie(currentMovie)}
          >
            +
          </div>
          <ul className={`List__list`}>{this.list()}</ul>
        </div>
      </HideMe>
    )
  }
}
