import React, { Component } from 'react'
import moment from 'moment'
import youtubeLink from 'utils/youtubeLink'
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
    const { savedMovies, actions: { deleteMovie } } = this.props

    return Object.values(savedMovies)
      .filter(movie => movie !== undefined)
      .map(movie => (
      <li key={movie.id} className={`ListItem`}>
        <div className={`ListItem__header`}>
          <div className={`ListItem__header-left`}>
            <a
              className={`ListItem__delete-icon`}
              onClick={() => deleteMovie(movie.id)}
            />
            <p className={`ListItem__title`}>{movie.title}</p>
          </div>
          <div className={`ListItem__header-right`}>
            <mark className={`ListItem__toggle-icon`}/>
          </div>
        </div>

        <div className={`ListItem__body`}>
          <div className={`ListItem__info`}>
            <p>{this.directorNames(movie)}</p>
            <p>
              Released: {moment(movie.release_date).format('MMMM Do YYYY')}
            </p>
          </div>
          <a
            className={`ListItem__links`}
            href={youtubeLink(movie.trailer.key)}
            target='_blank'
          >
            &#11016;
          </a>
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
