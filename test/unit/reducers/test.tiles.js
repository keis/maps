import test from 'tape'
import { clear, brush } from '../../../lib/actions/map'
import tiles from '../../../lib/reducers/tiles'

test('brush adds a tile', t => {
  const state = tiles(void 0, brush(2, 4))

  t.plan(1)
  t.deepEqual(state, [{x: 2, y: 4}])
})

test('brush is nop when already existing', t => {
  const state = tiles(void 0, brush(2, 4))
  const statep = tiles(state, brush(2, 4))

  t.plan(1)
  t.equal(state, statep)
})

test('clear removes a tile', t => {
  const state = tiles([{x: 2, y: 4}, {x: 3, y: 4}], clear(2, 4))

  t.plan(1)
  t.deepEqual(state, [{x: 3, y: 4}])
})

test('nop for invalid action types', t => {
  const initState = [{x: 1, y: 2}]
  const state = tiles(initState, {type: 'bla'})

  t.plan(1)
  t.deepEqual(state, initState)
})
