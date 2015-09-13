import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSnapGrid } from 'interact.js'
import { createSelector } from 'reselect'
import Canvas from './../../components/canvas'
import ToolBar from './../../components/toolbar'
import { toggle, setForeground } from './../../actions/map'
import createRenderer from './render'
import asPaths from './path'

const pixelSize = 64

const snap = createSnapGrid({
  x: pixelSize,
  y: pixelSize
})

function scale (ctx) {
  ctx.scale(pixelSize, pixelSize)
}

const tilesSelector = state => state.tiles

const colorSelector = state => state.color

const pathsSelector = createSelector(
  tilesSelector,
  tiles => asPaths(tiles.map(tile => [tile.x, tile.y]))
)

const editorSelector = createSelector(
  [pathsSelector, colorSelector],
  (paths, color) => ({color, paths})
)

const editorDispatch = {
  toggle, setForeground
}

class Editor extends Component {
  render () {
    const { paths, color, toggle, setForeground } = this.props

    function drawMap (ctx) {
      createRenderer({context: ctx})(paths)
    }

    function foreground (ctx) {
      ctx.strokeStyle = color
    }

    function click (event) {
      const pos = snap(event.pageX, event.pageY)
      toggle(pos.x / pixelSize, pos.y / pixelSize)
    }

    function changeColor (color) {
      setForeground(color)
    }

    return React.createElement('div', {},
      React.createElement(Canvas, {
        width: 800,
        height: 600,
        scene: [scale, foreground, drawMap],
        onClick: click
      }),
      React.createElement(ToolBar, {color, changeColor})
    )
  }
}

export default connect(editorSelector, editorDispatch)(Editor)
