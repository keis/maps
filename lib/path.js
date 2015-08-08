export default asPaths

function remove(lst, node) {
  if (!lst) {
    return false
  }

  for (var i = 0; i < lst.length; i++) {
    var p = lst[i]
    if (p[0] == node[0] && p[1] == node[1]) {
      lst.splice(i, 1)
      return true
    }
  }
  return false
}

function asPaths(tiles) {
  let bucket = []
    , paths = []

  function pushPath(path) {
    var i
      , prev
      , node
      , l

    prev = path[0]
    for (i = 1; i < path.length; i++) {
      node = path[i]
      if (!remove((bucket[node[0]] || [])[node[1]], prev)) {
        l = bucket[prev[0]] || (bucket[prev[0]] = [])
        l = l[prev[1]] || (l[prev[1]] = [])
        l.push(node)
      }
      prev = node
    }
  }

  // Buld a map of src -> dst from the sections of the paths
  // while eliminating overlapping sections
  tiles.forEach(function (tile) {
    pushPath([ [tile[0] - 0.5, tile[1] - 0.5]
             , [tile[0] + 0.5, tile[1] - 0.5]
             , [tile[0] + 0.5, tile[1] + 0.5]
             , [tile[0] - 0.5, tile[1] + 0.5]
             , [tile[0] - 0.5, tile[1] - 0.5] ])
  })

  // Reconstruct paths
  var path
    , next

  for (var x in bucket) {
    for (var y in bucket[x]) {
      if (bucket[x][y].length === 0) {
        continue
      }

      next = [Number(x), Number(y)]
      path = [next]
      do {
        next = bucket[next[0]][next[1]].shift()
        path.push(next)
      } while (next[0] !== path[0][0] || next[1] !== path[0][1])
      paths.push(path)
    }
  }

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
