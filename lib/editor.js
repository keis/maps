import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSnapGrid } from 'interact.js'
import Canvas from './canvas'
import createRenderer from './render'
import { toggle } from './map'

const pixelSize = 64

const snap = createSnapGrid({
  x: pixelSize,
  y: pixelSize
})


function scale(ctx) {
  ctx.scale(pixelSize, pixelSize)
}

@connect(state => ({map: state}))
export default class Editor extends Component {
  render() {
    const { width, height, map, dispatch } = this.props

    function drawMap(ctx) {
      createRenderer({context: ctx})(map)
    }

    function click(event) {
      const pos = snap(event.pageX, event.pageY)
      dispatch(toggle(pos.x / pixelSize, pos.y / pixelSize))
    }

    return React.createElement(Canvas, { width: 800
                                       , height: 600
                                       , scene: [scale, drawMap]
                                       , onClick: click
                                       })
  }
}
