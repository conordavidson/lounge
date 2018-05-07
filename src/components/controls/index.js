import React, { Component } from 'react'
import HideMe from 'components/HideMe'
import './style.css'

class Controls extends Component {
  render() {
    const { atFirstMovie, actions: { queueBackward, nextMovie } } = this.props

    return (
      <HideMe>
        <div className={`ControlsComponent`}>
          {!atFirstMovie ? <a onClick={queueBackward}>PREV</a> : null}
          <a onClick={nextMovie}>NEXT</a>
        </div>
      </HideMe>
    )
  }
}

export default Controls;
