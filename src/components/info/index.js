import React, { Component } from 'react'
import HideMe from 'components/HideMe'
import { TRAILER } from 'constants/PlayerViews'
import './style.css'

class Info extends Component {
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

  render() {
    const { currentPlayerView, currentMovie } = this.props
    if (currentPlayerView !== TRAILER) return null

    return (
      <HideMe>
        <div className={`InfoComponent`}>
          <mark className={`InfoComponent__icon`} />
          <p className={`InfoComponent__title`}>{currentMovie.title}</p>
          <p className={`InfoComponent__directors`}>{this.directorNames()}</p>
          <p className={`InfoComponent__release_date`}>
            {currentMovie.release_date}
          </p>
        </div>
      </HideMe>
    )
  }
}

export default Info
