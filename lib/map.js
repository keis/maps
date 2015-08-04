import find from 'component-find'
import assign from 'object-assign'

export default function Map(options) {
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
