import cave from 'canvas-cave-path'

export default createRenderer

function createRenderer (options) {
  const ctx = options.context

  return paths => {
    paths.forEach(path => {
      ctx.save()
      ctx.scale(1 / 64, 1 / 64)
      ctx.strokeStyle = 'black'
      ctx.lineWidth = 5
      cave(ctx, path.map(p => [p[0] * 64, p[1] * 64]))
      ctx.restore()
    })
  }
}
