import React, { Component } from 'react'
import HideMe from 'components/HideMe'
import './style.css'

class Controls extends Component {
  render() {
    const { actions: { previousMovie, nextMovie } } = this.props

    return (
      <HideMe>
        <div className={`ControlsComponent`}>
          <a onClick = {() => previousMovie()}>PREV</a>
          <a onClick = {() => nextMovie()}>NEXT</a>
        </div>
      </HideMe>
    )
  }
}

export default Controls;
