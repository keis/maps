var test = require('tape')
  , getBounds = require('bound-points')
  , asPaths = require('../../lib/path')

function rightAngles(t, nodes) {
  var prev = nodes[0]
    , node
    , i

  for (i = 1; i < nodes.length; i++) {
    node = nodes[i]
    t.ok(prev[0] == node[0] || prev[1] == node[1], 'straight angle')
    prev = node
  }
}

function boundingBox(nodes) {
  var bounds = getBounds(nodes)

  return { left: bounds[0][0]
         , top:  bounds[0][1]
         , right: bounds[1][0]
         , bottom: bounds[1][1]
         }
}

test('borders of single tile', function (t) {
  var tiles = [[4, 4]]
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

test('two adjacent tiles - y', function (t) {
  var tiles = [ [4, 4], [4, 5] ]
    , paths = asPaths(tiles)
    , path

  t.plan(8)
  t.equal(paths.length, 1, 'number of paths')

  path = paths[0]
  t.equal(path.length, 5, 'length of path')

  // ensure right angles
  rightAngles(t, path)

  // ensure the path is a loop
  t.deepEqual(path[0], path[path.length-1])

  // check bounding box
  t.deepEqual(boundingBox(path), { top: 3.5, left: 3.5, right: 4.5, bottom: 5.5})
})

test('two adjacent tiles - x', function (t) {
  var tiles = [ [4, 4], [5, 4] ]
    , paths = asPaths(tiles)
    , path

  t.plan(8)
  t.equal(paths.length, 1, 'number of paths')

  path = paths[0]
  t.equal(path.length, 5, 'length of path')

  // ensure right angles
  rightAngles(t, path)

  // ensure the path is a loop
  t.deepEqual(path[0], path[path.length-1])

  // check bounding box
  t.deepEqual(boundingBox(path), { top: 3.5, left: 3.5, right: 5.5, bottom: 4.5})
})

test('joining disjoint paths', function (t) {
  var tiles = [ [4, 4], [4, 6], [4, 5]]
    , paths = asPaths(tiles)
    , path

  t.plan(8)
  t.equal(paths.length, 1, 'number of paths')

  path = paths[0]
  t.equal(path.length, 5, 'length of path')

  // ensure right angles
  rightAngles(t, path)

  // ensure the path is a loop
  t.deepEqual(path[0], path[path.length-1])

  // check bounding box
  t.deepEqual(boundingBox(path), { top: 3.5, left: 3.5, right: 4.5, bottom: 6.5})
})
