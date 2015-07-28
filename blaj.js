var arrow = require('./lib/arrow')

setTimeout(function () {
  var canvas = document.getElementById('main-view')
    , ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.translate(200, 200)
  arrow(ctx, [ {x: 0, y: 0}
             , {x: 200, y: 0}
             , {x: 250, y: 100}
             , {x: 250, y: 200}
             ])
}, 400)
