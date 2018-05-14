import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import moment from 'moment'
import cx from 'classnames'
import youtubeLink from 'utils/youtubeLink'
import HideMe from 'components/HideMe'
import './style.css'

export default class extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      listExpanded: false,
      expandedMovieIds: []
    }
  }

  directorNames(movie) {
    const directorNames = movie.directors.reduce((result, director, index) => {
      return index === 0
        ? result + director.name
        : result + `, ${director.name}`
    }, ``)
    return `Directed By: ${directorNames}`
  }

  toggleMovieExpandContract(id) {
    const { expandedMovieIds } = this.state
    expandedMovieIds.includes(id)
      ? this.setState({
          expandedMovieIds: expandedMovieIds.filter(expandedId => {
            return expandedId !== id
          })
        })
      : this.setState({
          expandedMovieIds: expandedMovieIds.concat(id)
        })
  }

  list() {
    const { savedMovies, actions: { deleteMovie } } = this.props
    const { expandedMovieIds } = this.state

    return Object.values(savedMovies)
      .filter(movie => movie !== undefined)
      .map(movie => {
        const isExpanded = expandedMovieIds.includes(movie.id)
        const itemClasses = cx('ListItem', {
          'ListItem--expanded': isExpanded
        })
        return (
          <li key={movie.id} className={itemClasses}>
            {isExpanded ? (
              <div className={`ListItem__left`}>
                <a
                  className={`ListItem__delete-icon`}
                  onClick={() => deleteMovie(movie.id)}
                />
              </div>
            ) : null}
            <div className={`ListItem__center`}>
              <div className={`ListItem__info`}>
                <p
                  className={`ListItem__title`}
                  onClick={() => this.toggleMovieExpandContract(movie.id)}
                >
                  {movie.title}
                </p>
                {isExpanded ? (
                  <div className={'ListItem__body'}>
                    <p>{this.directorNames(movie)}</p>
                    <p>
                      Released:{' '}
                      {moment(movie.release_date).format('MMMM Do YYYY')}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className={`ListItem__right`}>
              <mark
                className={`ListItem__toggle-icon`}
                onClick={() => this.toggleMovieExpandContract(movie.id)}
              />
              {isExpanded ? (
                <a
                  className={`ListItem__link`}
                  href={youtubeLink(movie.trailer.key)}
                  target="_blank"
                >
                  &#11016;
                </a>
              ) : null}
            </div>
          </li>
        )
      })
  }

  toggleListExpandContract() {
    const { listExpanded } = this.state
    this.setState({ listExpanded: !listExpanded })
  }

  handleListHover = () => {
    const { isTouchScreen } = this.props
    if (isTouchScreen) return
    this.toggleListExpandContract()
  }

  handleListTouch = () => {
    const { isTouchScreen } = this.props
    if (!isTouchScreen) return
    this.toggleListExpandContract()
  }

  render() {
    const { savedMovies, currentMovie, actions: { saveMovie } } = this.props
    const { listExpanded } = this.state
    const listClasses = cx('List', {
      'List--expanded': listExpanded
    })

    return [
      <HideMe>
        <div
          className={`List__add-icon`}
          onClick={() => (currentMovie ? saveMovie(currentMovie) : false)}
        >
          +
        </div>
      </HideMe>,
      <HideMe displayedOnHome>
        <div
          className={listClasses}
          onMouseEnter={this.handleListHover}
          onMouseLeave={this.handleListHover}
        >
          <div
            className={`List__indicator`}
            onTouchStart={this.handleListTouch}
          >
            ({Object.keys(savedMovies).length})
          </div>
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {listExpanded ? (
              <ul className={`List__list`}>{this.list()}</ul>
            ) : null}
          </CSSTransitionGroup>
        </div>
      </HideMe>
    ]
  }
}
