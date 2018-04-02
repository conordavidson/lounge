import React, { Component } from 'react'
import './style.css'

class Controls extends Component {
  render() {
    return (
      <div className={`controls_component`}>
        <a onClick = {() => this.props.previousMovie()}>PREV</a>
        <a onClick = {() => this.props.nextMovie()}>NEXT</a>
      </div>
    )
  }
}

export default Controls;
