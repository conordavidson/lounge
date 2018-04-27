import React, { Component } from 'react'
import './style.css'

class Controls extends Component {
  render() {
    const { actions: { previousMovie, nextMovie } } = this.props

    return (
      <div className={`ControlsComponent`}>
        <a onClick = {() => previousMovie()}>PREV</a>
        <a onClick = {() => nextMovie()}>NEXT</a>
      </div>
    )
  }
}

export default Controls;
