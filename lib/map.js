var find = require('component-find')
  , assign = require('object-assign')

module.exports = Map

function Map(options) {
  this.tiles = []
}

Map.prototype.update = function(pos, data) {
  var tile = find(this.tiles, {pos: pos})

  if (!tile) {
    tile = {pos: pos}
    this.tiles.push(tile)
  }

  assign(tile, data)
}
