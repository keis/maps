var asPaths = require('./path')

module.exports = createRenderer

function drawPath(ctx, path) {
  var node = path[0]
    , i
  ctx.beginPath()
  ctx.moveTo(node[0], node[1])
  for (i = 1; i < path.length; i++) {
    node = path[i]
    ctx.lineTo(node[0], node[1])
  }
  ctx.lineWidth = 0.1
  ctx.strokeStyle = 'green'
  ctx.stroke()
}

function drawWobblyPath(ctx, path) {
  var node = path[0]
    , step
    , curx
    , cury
    , i
    , s

  function variance() {
    return (Math.random() - 0.5) * 0.1
  }

  ctx.beginPath()
  ctx.moveTo(node[0], node[1])
  curx = node[0]
  cury = node[1]
  for (i = 1; i < path.length; i++) {
    node = path[i]
    step = [ (node[0] - curx)/10,
             (node[1] - cury)/10
           ]
    for (s = 0; s < 10; s++) {
      curx += step[0] + variance()
      cury += step[1] + variance()
      ctx.lineTo(curx, cury)
    }
  }
  ctx.lineWidth = 0.03
  ctx.strokeStyle = 'blue'
  ctx.stroke()
}

function createRenderer(options) {
  var ctx = options.context

  return function render(map) {
    var paths = asPaths(map.tiles.map(function (tile) { return tile.pos }))
    paths.forEach(function (path) {
      ctx.save()
      //drawPath(ctx, path)
      drawWobblyPath(ctx, path)
      ctx.restore()
    })
  }
}
