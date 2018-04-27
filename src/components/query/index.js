import React, { Component } from 'react'
import Genres from '../../external/themoviedb/genres.js'
import Language from 'constants/Language'
import cx from 'classnames'
import { CSSTransitionGroup } from 'react-transition-group'
import { debounce } from 'throttle-debounce'
import './style.css'

class Query extends Component {
  constructor(props) {
    super(props)
    this.validateYears = debounce(500, this.validateYears);
    this.state = {
      minYear: null,
      maxYear: null,
      errors: []
    }
  }

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

  setYearsAndQuery(e) {
    e.preventDefault()
    const { actions: { setYearsAndQuery } } = this.props
    const { minYear, maxYear } = this.state
    return setYearsAndQuery({ minYear, maxYear })
  }

  validateYears() {
    const { minYear, maxYear } = this.state
    const currentYear = new Date().getFullYear()
    const errors = []
    if (minYear > maxYear && maxYear !== null) {
      errors.push(Language.errors.yearsReversed)
    }
    if (maxYear < 1900 && maxYear !== null) {
      errors.push(Language.errors.maxYearTooEarly)
    }
    if (minYear > currentYear) {
      errors.push(Language.errors.minYearInFuture)
    }
    if (!(/^\d{4}$/).test(minYear) && minYear !== null) {
      errors.push(Language.errors.invalidMinYear)
    }
    if (!(/^\d{4}$/).test(maxYear) && maxYear !== null) {
      errors.push(Language.errors.invalidMaxYear)
    }
    this.setState({ errors })
  }

  setYears(changed, e) {
    this.setState(
      {
        [changed]: parseInt(e.target.value, 10) || null
      },
      () => this.validateYears()
    )
  }

  yearSelector() {
    return (
      <form onSubmit={e => this.setYearsAndQuery(e)}>
        <label>FROM</label>
        <input
          onChange={e => this.setYears('minYear', e)}
          name="minYear"
          type="text"
          maxLength="4"
          size="4"
        />
        <label>TO</label>
        <input
          onChange={e => this.setYears('maxYear', e)}
          name="maxYear"
          type="text"
          maxLength="4"
          size="4"
        />
        <button type="submit" />
      </form>
    )
  }

  errorTooltip() {
    const { errors } = this.state
    const errorText = errors.map((error, i) => <p key={i}>{error}</p>)
    const classes = cx('QueryComponent__error-tooltip')
    return <div className={classes}>{errorText}</div>
  }

  render() {
    const { errors } = this.state

    return (
      <div className={`QueryComponent`}>
        <ul>{this.genreDropdown()}</ul>
        <div className={`QueryComponent__years`}>
          {this.yearSelector()}
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {errors.length ? this.errorTooltip() : null}
          </CSSTransitionGroup>
        </div>
      </div>
    )
  }
}

export default Query
