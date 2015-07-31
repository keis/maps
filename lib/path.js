var rotate = require('rotate-array')

module.exports = asPaths

function isOverlapping(a0, a1, b0, b1) {
  // Abuses the fact that paths are clock-wise and each section a length of 1
  return (
          (a0[0] == a1[0] && a1[0] == b0[0] && b0[0] == b1[0]) &&
          (a0[1] == b1[1] && a1[1] == b0[1])
         ) || (
          (a0[1] == a1[1] && a1[1] == b0[1] && b0[1] == b1[1]) &&
          (a0[0] == b1[0] && a1[0] == b0[0])
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
    pushPath([ [tile[0] - 0.5, tile[1] - 0.5]
             , [tile[0] + 0.5, tile[1] - 0.5]
             , [tile[0] + 0.5, tile[1] + 0.5]
             , [tile[0] - 0.5, tile[1] + 0.5]
             , [tile[0] - 0.5, tile[1] - 0.5] ])
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
      if (a[0] == b[0] && a[0] == c[0]) {
        b[1] = c[1]
      } else if (a[1] == b[1] && a[1] == c[1]) {
        b[0] = c[0]
      } else {
        result.push(c)
        a = b
        b = c
      }
    }

    a = result[0]
    b = result[1]
    c = result[result.length-2]
    if ((a[0] == b[0] && b[0] == c[0]) || (a[1] == b[1] && b[1] == c[1])) {
      result = result.slice(1, result.length - 1)
      result.push(result[0])
    }

    return result
  })
}
