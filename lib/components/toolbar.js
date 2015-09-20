import React, { Component, PropTypes } from 'react'
import InputColor from 'react-input-color'
import 'react-input-color/dist/input-color.css'

export default class ToolBar extends Component {
  render () {
    const {color, changeColor} = this.props
    const divStyle = {
      display: 'inline-block',
      verticalAlign: 'top'
    }
    return (
      <div style={divStyle}>
        <InputColor value={color} defaultValue='black'
                    onChange={changeColor} />
      </div>
    )
  }
}

ToolBar.propTypes = {
  color: PropTypes.string,
  changeColor: PropTypes.func.isRequired
}
