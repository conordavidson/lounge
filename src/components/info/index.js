import React, { Component } from 'react'
import moment from 'moment'
import { CSSTransitionGroup } from 'react-transition-group'
import HideMe from 'components/HideMe'
import { TRAILER } from 'constants/PlayerViews'
import './style.css'

class Info extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      infoDisplayed: false
    }
  }

  directorNames() {
    const { currentMovie } = this.props

    const directorNames = currentMovie.directors.reduce(
      (result, director, index) => {
        return index === 0
          ? result + director.name
          : result + `, ${director.name}`
      },
      ``
    )

    return `Directed By: ${directorNames}`
  }

  toggleInfoDisplayed() {
    const { infoDisplayed } = this.state
    this.setState({ infoDisplayed: !infoDisplayed })
  }

  handleHover = () => {
    const { isTouchScreen } = this.props
    if (isTouchScreen) return
    this.toggleInfoDisplayed()
  }

  handleTouch = () => {
    const { isTouchScreen } = this.props
    if (!isTouchScreen) return
    this.toggleInfoDisplayed()
  }

  render() {
    const { currentPlayerView, currentMovie } = this.props
    const { infoDisplayed } = this.state
    if (currentPlayerView !== TRAILER) return null

    return (
      <HideMe>
        <div
          className={`InfoComponent`}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
          onTouchStart={this.handleTouch}
        >
          <mark className={`InfoComponent__icon`} />
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
            transitionAppear={true}
            transitionAppearTimeout={1000}
          >
            {infoDisplayed ? (
              <div className={`InfoComponent__info`}>
                <p className={`InfoComponent__title`}>{currentMovie.title}</p>
                <p className={`InfoComponent__directors`}>
                  {this.directorNames()}
                </p>
                <p className={`InfoComponent__release_date`}>
                  Released:{' '}
                  {moment(currentMovie.release_date).format('MMMM Do YYYY')}
                </p>
              </div>
            ) : null}
          </CSSTransitionGroup>
        </div>
      </HideMe>
    )
  }
}

export default Info
