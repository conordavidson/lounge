import React, { Component } from 'react';
import Genres from '../../external/themoviedb/genres.js'
import './style.css'

class Query extends Component {
  genreDropdown() {
    const { genre, actions: { setGenreAndQuery } } = this.props

    return Object.keys(Genres).map(genreName => {
      const genreId = Genres[genreName]
      return (
        <li
          className={genreId === genre ? 'active' : null}
          key={genreId}
          onClick={() => setGenreAndQuery(genreId)}
        >
          {genreName}
        </li>
      )
    })
  }

  setYear(e) {
    const { actions: { setYearsAndQuery } } = this.props
    e.preventDefault()
    const min = parseInt(e.target.min.value, 10) || null
    const max = parseInt(e.target.max.value, 10) || null
    return setYearsAndQuery({ min, max })
  }

  yearSelector() {
    return (
      <form onSubmit={(e) => this.setYear(e)}>
        <label>FROM</label>
        <input name='min' type='text'/>
        <label>TO</label>
        <input name='max' type='text'/>
        <button type='submit'/>
      </form>
    )
  }

  render() {
    return (
      <div className={`QueryComponent`}>
        <ul>{this.genreDropdown()}</ul>
        <div>{this.yearSelector()}</div>
      </div>
    )
  }
}

export default Query;
