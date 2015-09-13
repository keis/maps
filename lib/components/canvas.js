import React, { Component, PropTypes } from 'react'

export default class Canvas extends Component {
  componentDidMount () {
    const { scene } = this.props
    this.paint(scene)
  }

  componentDidUpdate () {
    const { scene } = this.props
    this.paint(scene)
  }

  paint (scene) {
    const { width, height } = this.props
    const ctx = React.findDOMNode(this.refs.root).getContext('2d')
    ctx.clearRect(0, 0, width, height)
    ctx.save()
    scene.forEach(p => p(ctx))
    ctx.restore()
  }

  render () {
    const { width, height, onClick } = this.props
    return React.createElement('canvas', {
      width, height,
      ref: 'root',
      onClick: onClick
    })
  }
}

Canvas.propTypes = {
  scene: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}
