var find = require('component-find')
  , assign = require('object-assign')

module.exports = Map

function Map(options) {
  this.tiles = []
}

Map.prototype.update = function(pos, data) {
  var tile = find(this.tiles, {x: pos.x, y: pos.y})

  if (!tile) {
    tile = {x: pos.x, y: pos.y}
    this.tiles.push(tile)
  }

  assign(tile, data)
}
