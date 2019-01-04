import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'
import { debounce } from 'throttle-debounce'
import cx from 'classnames'
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
      errors: [],
      genreDropdownExpanded: false,
    }
  }

  toggleGenreDropdownExpandContract() {
    const { genreDropdownExpanded } = this.state
    this.setState({ genreDropdownExpanded: !genreDropdownExpanded })
  }

  handleGenreDropdownHover = () => {
    const { isTouchScreen } = this.props
    if (isTouchScreen) return
    this.toggleGenreDropdownExpandContract()
  }

  handleGenreDropdownTouch = () => {
    const { isTouchScreen } = this.props
    if (!isTouchScreen) return
    this.toggleGenreDropdownExpandContract()
  }

  genreDropdown() {
    const {
      genre,
      years,
      actions: { setQuery },
    } = this.props
    const { genreDropdownExpanded } = this.state
    const classes = cx('GenreDropdown', {
      'GenreDropdown--expanded': genreDropdownExpanded,
    })

    return (
      <div
        className={classes}
        onMouseEnter={this.handleGenreDropdownHover}
        onMouseLeave={this.handleGenreDropdownHover}
        onTouchStart={this.handleGenreDropdownTouch}
      >
        <div className={`GenreDropdown__selected-genre`}>{Language.genres[genre]}</div>
        <CSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {genreDropdownExpanded ? (
            <ul className={`GenreDropdown__list`}>
              {Object.keys(Genres)
                .filter(key => key !== genre)
                .map(key => {
                  return (
                    <li className={`GenreDropdown__item`} key={key} onClick={() => setQuery({ years, genre: key })}>
                      {Language.genres[key]}
                    </li>
                  )
                })}
            </ul>
          ) : null}
        </CSSTransitionGroup>
      </div>
    )
  }

  setYearsAndQuery(e) {
    e.preventDefault()
    const {
      genre,
      actions: { setQuery },
    } = this.props
    const { minYear, maxYear } = this.state
    return setQuery({
      genre,
      years: {
        min: minYear,
        max: maxYear,
      },
    })
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
        [changed]: parseInt(e.target.value, 10) || null,
      },
      () => this.validateYears(),
    )
  }

  yearSelector() {
    return (
      <form onSubmit={e => this.setYearsAndQuery(e)} autoComplete="off">
        <label>FROM</label>
        <input onChange={e => this.setYears('minYear', e)} name="minYear" type="text" maxLength="4" size="4" />
        <label>TO</label>
        <input onChange={e => this.setYears('maxYear', e)} name="maxYear" type="text" maxLength="4" size="4" />
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
      <HideMe displayedOnHome hiddenOnIntermission>
        <div className={`QueryComponent`}>
          <div className={`QueryComponent__years`}>
            {this.yearSelector()}
            <CSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {errors.length ? this.errorTooltip() : null}
            </CSSTransitionGroup>
          </div>
          {this.genreDropdown()}
        </div>
      </HideMe>
    )
  }
}

export default Query
