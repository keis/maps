var asPaths = require('./path')

module.exports = createRenderer

function drawPath(ctx, path) {
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
  ctx.moveTo(node.x, node.y)
  curx = node.x
  cury = node.y
  for (i = 1; i < path.length; i++) {
    node = path[i]
    step = { x: (node.x - curx)/10,
             y: (node.y - cury)/10
           }
    for (s = 0; s < 10; s++) {
      curx += step.x + variance()
      cury += step.y + variance()
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
    var paths = asPaths(map.tiles)
    paths.forEach(function (path) {
      ctx.save()
      //drawPath(ctx, path)
      drawWobblyPath(ctx, path)
      ctx.restore()
    })
  }
}
