module.exports = arrow

function normalize(a) {
  var x = a.x
    , y = a.y
    , len = x*x + y*y

  if (len > 0) {
    len = 1 / Math.sqrt(len)
    return { x: x * len
           , y: y * len
           }
  }
}

function length(a) {
  var x = a.x
    , y = a.y

  return Math.sqrt(x*x + y*y)
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y
}

function arrow(ctx, path) {
  var node = path[0]
    , prev = node
    , pv = {x: 1, y: 0}
    , step = 10
    , off
    , len
    , v
    , i

  ctx.save()
  ctx.translate(node.x, node.y)

  ctx.lineWidth = 2
  ctx.strokeStyle = 'red'

  for (i = 1; i < path.length; i++) {
    node = path[i]
    v = { x: node.x - prev.x
        , y: node.y - prev.y
        }
    len = length(v)
    v = normalize(v)
    ctx.rotate(Math.acos(dot(pv, v)))
    for (off = step - 1; off < len; off += step) {
      ctx.beginPath()
      ctx.moveTo(off - 4, -4)
      ctx.lineTo(off, 0)
      ctx.lineTo(off - 4, 4)
      ctx.stroke()
    }
    ctx.translate(len, 0)
    prev = node
    pv = v
  }
  ctx.restore()
}
