import asPaths from './path'
import cave from 'canvas-cave-path'

export default createRenderer

function createRenderer(options) {
  let ctx = options.context

  return function render(map) {
    let tiles = map//.getState()
      , paths = asPaths(tiles.map(tile => [tile.x, tile.y]))

    paths.forEach(path => {
      ctx.save()
      ctx.scale(1/64, 1/64)
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 5
      cave(ctx, path.map(p => [p[0] * 64, p[1] * 64]))
      ctx.restore()
    })
  }
}
