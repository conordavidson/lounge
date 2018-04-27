import React, { Component } from 'react'
import './style.css'

class Info extends Component {
  directorNames() {
    const { currentMovie } = this.props

    const directorNames = currentMovie.directors.reduce((result, director, index) => {
      return index === 0 ? result + director.name : result + `, ${director.name}`
    }, ``)

    return `Directed By: ${directorNames}`
  }

  render() {
    const { _STATUS_INITIALIZED, _STATUS_LOADING, currentMovie } = this.props;

    return (
      <div className={`InfoComponent`}>
        {_STATUS_INITIALIZED && !_STATUS_LOADING ?
          <div>
            <mark className={`InfoComponent__icon`} />
            <p className={`InfoComponent__title`}>{currentMovie.title}</p>
            <p className={`InfoComponent__directors`}>{this.directorNames()}</p>
            <p className={`InfoComponent__release_date`}>{currentMovie.release_date}</p>
          </div>
        :
          null
        }
      </div>
    )
  }
}

export default Info;
