import interact from 'interact.js'
import Map from './lib/map'
import createRenderer from './lib/render'

let pixelSize = 64

let map = new Map({})
let snap = interact.createSnapGrid({
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
    let ctx = event.target.getContext('2d')
      , pos = snap(event.pageX, event.pageY)
      , render = createRenderer({ context: ctx })

    map.update([pos.x / pixelSize, pos.y / pixelSize], {brush: 'open'})

    ctx.clearRect(0, 0, event.target.width, event.target.height)
    ctx.save()
    ctx.scale(pixelSize, pixelSize)
    render(map)
    ctx.restore()
  })
