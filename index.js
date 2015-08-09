import interact from 'interact.js'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reduce, brush, clear, toggle } from './lib/map'
import createRenderer from './lib/render'

let pixelSize = 64

let map = applyMiddleware(thunk)(createStore)(reduce)
let snap = interact.createSnapGrid({
  x: pixelSize,
  y: pixelSize
})

map.subscribe(function () {
  let canvas = document.getElementById('main-view')
    , ctx = canvas.getContext('2d')
    , render = createRenderer({ context: ctx })

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.scale(pixelSize, pixelSize)
  render(map)
  ctx.restore()
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
    let pos = snap(event.pageX, event.pageY)

    map.dispatch(toggle(pos.x / pixelSize, pos.y / pixelSize))
  })
