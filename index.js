var interact = require('interact.js')
  , Map = require('./lib/map')
  , createRenderer = require('./lib/render')
  , pixelSize = 64
  , snap
  , map
  , render

require('./lib/render')

map = new Map({})
snap = interact.createSnapGrid({
  x: pixelSize,
  y: pixelSize
})


interact('#main-view')
  .origin('self')
  .draggable({
    snap: {
      targets: [snap]
    },
    maxPerElement: Infinity
  })
  .on('tap', function (event) {
    var ctx = event.target.getContext('2d')
      , pos = snap(event.pageX, event.pageY)

    map.update({x: pos.x / pixelSize, y: pos.y / pixelSize}, {brush: 'open'})

    render = createRenderer({
      context: ctx,
    })

    ctx.save()
    ctx.scale(pixelSize, pixelSize)
    render(map)
    ctx.restore()
  })
