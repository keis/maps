import test from 'tape'
import { clear, brush, reduce } from '../../lib/map'

test('brush adds a tile', function (t) {
  const state = reduce(void 0, brush(2, 4))

  t.plan(1)
  t.deepEqual(state, {tiles: [{x: 2, y: 4}]})
})

test('brush is nop when already existing', function (t) {
  const state = reduce(void 0, brush(2, 4))
  const statep = reduce(state, brush(2, 4))

  t.plan(1)
  t.equal(state, statep)
})

test('clear removes a tile', function (t) {
  const state = reduce({tiles: [{x: 2, y: 4}, {x: 3, y: 4}]}, clear(2, 4))

  t.plan(1)
  t.deepEqual(state, {tiles: [{x: 3, y: 4}]})
})
