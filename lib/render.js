import asPaths from './path'
import cave from 'canvas-cave-path'

export default createRenderer

function createRenderer(options) {
  var ctx = options.context

  return function render(map) {
    var paths = asPaths(map.tiles.map(function (tile) { return tile.pos }))
    paths.forEach(function (path) {
      ctx.save()
      ctx.scale(1/64, 1/64)
      cave(ctx, path.map(function (x) { return [x[0]*64, x[1]*64] }))
      ctx.restore()
    })
  }
}
