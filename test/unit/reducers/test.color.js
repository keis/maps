import test from 'tape'
import { setForeground } from '../../../lib/actions/map'
import color from '../../../lib/reducers/color'

test('updates the selected color', t => {
  const state = color(void 0, setForeground('red'))

  t.plan(1)
  t.equal(state, 'red')
})

test('nop for invalid action types', t => {
  const initState = 'PeachPuff'
  const state = color(initState, {type: 'bla'})

  t.plan(1)
  t.equal(state, initState)
})
