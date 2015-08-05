import find from 'component-find'
import assign from 'object-assign'

export default function Map(options) {
  this.tiles = []
}

Map.prototype.update = function(pos, data) {
  var tile = find(this.tiles, {x: pos[0], y: pos[1]})

  if (!tile) {
    tile = {x: pos[0], y: pos[1]}
    this.tiles.push(tile)
  }

  assign(tile, data)
}
