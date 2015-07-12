var test = require('tape')
  , asPaths = require('../../lib/path')

function rightAngles(t, nodes) {
  var prev = nodes[0]
    , node
    , i

  for (i = 1; i < nodes.length; i++) {
    node = nodes[i]
    t.ok(prev.x == node.x || prev.y == node.y, 'straight angle')
    prev = node
  }
}

test('borders of single tile', function (t) {
  var tiles = [{x: 4, y: 4}]
    , paths = asPaths(tiles)
    , path

  t.plan(7)
  t.equal(paths.length, 1, 'number of paths')

  path = paths[0]
  t.equal(path.length, 5, 'length of path')

  // ensure right angles
  rightAngles(t, path)

  // ensure the path is a loop
  t.deepEqual(path[0], path[path.length-1])
})

test('two adjacent tiles', function (t) {
  var tiles = [{x: 4, y: 4}, {x: 4, y: 5}]
    , paths = asPaths(tiles)
    , path

  t.plan(7)
  t.equal(paths.length, 1, 'number of paths')

  path = paths[0]
  t.equal(path.length, 5, 'length of path')

  // ensure right angles
  rightAngles(t, path)

  // ensure the path is a loop
  t.deepEqual(path[0], path[path.length-1])

  // bounding box?
})
