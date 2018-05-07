import React, { Component } from 'react'
import HideMe from 'components/HideMe'
import './style.css'

class Controls extends Component {
  render() {
    const {
      atFirstMovie, paused,
      actions: { queueBackward, nextMovie, togglePlayPause }
    } = this.props

    return (
      <HideMe>
        <div className={`ControlsComponent`}>
          {!atFirstMovie ? <a onClick={queueBackward}>&#9666;&#9666;</a> : null}
          <a onClick={togglePlayPause}>{paused ? '\u25BA' : '\u2759\u2759' }</a>
          <a onClick={nextMovie}>&#9656;&#9656;</a>
        </div>
      </HideMe>
    )
  }
}

export default Controls;
