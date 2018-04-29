import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { debounce } from 'throttle-debounce'
import Genres from '../../external/themoviedb/genres.js'
import Language from 'constants/Language'
import HideMe from 'components/HideMe'
import './style.css'

class Query extends Component {
  constructor(props) {
    super(props)
    this.validateYears = debounce(500, this.validateYears)
    this.state = {
      minYear: null,
      maxYear: null,
      errors: []
    }
  }

  genreDropdown() {
    const { genre, actions: { setGenreAndQuery } } = this.props

    return (
      <div className={`GenreDropdown`}>
        <div className={`GenreDropdown__selected-genre`}>
          {genre ? Language.genres[genre] : 'All'}
        </div>
        <ul className={`GenreDropdown__list`}>
          {Object.keys(Genres)
            .filter(key => key !== genre)
            .map(key => {
              return (
                <li
                  className={`GenreDropdown__item`}
                  key={key}
                  onClick={() => setGenreAndQuery(key)}
                >
                  {Language.genres[key]}
                </li>
              )
            })}
        </ul>
      </div>
    )
  }

  setYearsAndQuery(e) {
    e.preventDefault()
    const { actions: { setYearsAndQuery } } = this.props
    const { minYear, maxYear } = this.state
    return setYearsAndQuery({ min: minYear, max: maxYear })
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
    if (!/^\d{4}$/.test(minYear) && minYear !== null) {
      errors.push(Language.errors.invalidMinYear)
    }
    if (!/^\d{4}$/.test(maxYear) && maxYear !== null) {
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
      <form onSubmit={e => this.setYearsAndQuery(e)} autocomplete="off">
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
    return <div className={'QueryComponent__error-tooltip'}>{errorText}</div>
  }

  render() {
    const { errors } = this.state

    return (
      <HideMe displayedOnHome>
        <div className={`QueryComponent`}>
          <div>{this.genreDropdown()}</div>
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
      </HideMe>
    )
  }
}

export default Query
