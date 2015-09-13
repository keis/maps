import React, { Component, PropTypes } from 'react'
import InputColor from 'react-input-color'
import 'react-input-color/dist/input-color.css'

export default class ToolBar extends Component {
  render () {
    const {color, changeColor} = this.props
    return React.createElement(
      'div',
      {style: {display: 'inline-block', verticalAlign: 'top'}},
      React.createElement(
        InputColor,
        {value: color, defaultValue: 'black', onChange: changeColor}
      )
    )
  }
}

ToolBar.propTypes = {
  color: PropTypes.string,
  changeColor: PropTypes.func.isRequired
}
