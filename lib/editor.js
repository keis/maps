import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSnapGrid } from 'interact.js'
import { createSelector } from 'reselect'
import Canvas from './canvas'
import createRenderer from './render'
import asPaths from './path'
import { toggle } from './map'

const pixelSize = 64

const snap = createSnapGrid({
  x: pixelSize,
  y: pixelSize
})

function scale (ctx) {
  ctx.scale(pixelSize, pixelSize)
}

const tilesSelector = state => state.tiles

const pathsSelector = createSelector(
  [tilesSelector],
  tiles => ({paths: asPaths(tiles.map(tile => [tile.x, tile.y]))})
)

class Editor extends Component {
  render () {
    const { paths, dispatch } = this.props

    function drawMap (ctx) {
      createRenderer({context: ctx})(paths)
    }

    function click (event) {
      const pos = snap(event.pageX, event.pageY)
      dispatch(toggle(pos.x / pixelSize, pos.y / pixelSize))
    }

    return React.createElement(Canvas, {
      width: 800,
      height: 600,
      scene: [scale, drawMap],
      onClick: click
    })
  }
}

export default connect(pathsSelector)(Editor)
