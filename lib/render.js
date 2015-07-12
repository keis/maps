module.exports = createRenderer

function asPaths(tiles) {
  var paths = []

  function pushPath(path) {
    paths.push(path)
  }

  tiles.forEach(function (tile) {
    pushPath([ {x: tile.x - 0.5, y: tile.y - 0.5}
             , {x: tile.x + 0.5, y: tile.y - 0.5}
             , {x: tile.x + 0.5, y: tile.y + 0.5}
             , {x: tile.x - 0.5, y: tile.y + 0.5}
             , {x: tile.x - 0.5, y: tile.y - 0.5}])
  })

  return paths
}

function createRenderer(options) {
  var ctx = options.context

  return function render(map) {
    var paths = asPaths(map.tiles)
    paths.forEach(function (path) {
      ctx.save()
      var node = path[0]
        , i
      ctx.beginPath()
      ctx.moveTo(node.x, node.y)
      for (i = 1; i < path.length; i++) {
        node = path[i]
        ctx.lineTo(node.x, node.y)
      }
      ctx.lineWidth = 0.1
      ctx.strokeStyle = 'green'
      ctx.stroke()
      ctx.restore()
    })
  }
}
