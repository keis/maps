var rotate = require('rotate-array')

module.exports = asPaths

function isOverlapping(a0, a1, b0, b1) {
  // Abuses the fact that paths are clock-wise and each section a length of 1
  return (
          (a0.x == a1.x && a1.x == b0.x && b0.x == b1.x) &&
          (a0.y == b1.y && a1.y == b0.y)
         ) || (
          (a0.y == a1.y && a1.y == b0.y && b0.y == b1.y) &&
          (a0.x == b1.x && a1.x == b0.x)
         )
}

function joinPath(a, ai, b, bi) {
  a.splice.apply(a, [ai, 0].concat(rotate(b, bi)))
}

function asPaths(tiles) {
  // Invariants
  // 1: Each path is always a full loop
  // 2: There is no overlapping paths
  var paths = []

  function pushPath(path) {
    var pend = path.length
      , opath
      , lnode
      , lprev
      , rnode
      , rprev
      , pi
      , li
      , ri

    rprev = path[0]
    outloop: for (ri = 1; ri < pend; ri++) {
      rnode = path[ri]
      for (pi = 0; pi < paths.length; pi++) {
        opath = paths[pi]
        lprev = opath[0]
        for (li = 1; li < opath.length; li++) {
          lnode = opath[li]
          if (isOverlapping(lprev, lnode, rprev, rnode)) {
            joinPath(opath, li, path, ri)
            paths.splice(pi, 1)
            rprev = lprev
            pend = pend + (li - ri)
            ri = li
            path = opath
            continue outloop
          }
          lprev = lnode
        }
      }
      rprev = rnode
    }

    paths.push(path)
  }

  tiles.forEach(function (tile) {
    pushPath([ {x: tile.x - 0.5, y: tile.y - 0.5}
             , {x: tile.x + 0.5, y: tile.y - 0.5}
             , {x: tile.x + 0.5, y: tile.y + 0.5}
             , {x: tile.x - 0.5, y: tile.y + 0.5}
             , {x: tile.x - 0.5, y: tile.y - 0.5}])
  })

  // Combine continued lines
  return paths.map(function (path) {
    // This abuses fact the it's only dealing with lines along the y or x axis
    // a more generic version should compare the angles.

    var a = path[0]
      , b = path[1]
      , result = [a, b]
      , c
      , i

    for (i = 2; i < path.length; i++) {
      c = path[i]
      if (a.x == b.x && a.x == c.x) {
        b.y = c.y
      } else if (a.y == b.y && a.y == c.y) {
        b.x = c.x
      } else {
        result.push(c)
        a = b
        b = c
      }
    }

    a = result[0]
    b = result[1]
    c = result[result.length-2]
    if ((a.x == b.x && b.x == c.x) || (a.y == b.y && b.y == c.y)) {
      console.log('haxx')
      result = result.slice(1, result.length - 1)
      result.push(result[0])
    }

    return result
  })
}
