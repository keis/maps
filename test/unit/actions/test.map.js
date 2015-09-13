import test from 'tape'
import { clear, brush, toggle, setForeground } from '../../../lib/actions/map'

test('clear generates correct payload', t => {
  const expected = {type: 'CLEAR', x: 2, y: 4}

  t.plan(1)
  t.deepEqual(clear(2, 4), expected)
})

test('brush generates correct payload', t => {
  const expected = {type: 'BRUSH', x: 8, y: 7}

  t.plan(1)
  t.deepEqual(brush(8, 7), expected)
})

test('toggle should brush if no tile exist in position', t => {
  const expected = {type: 'BRUSH', x: 1, y: 2}

  t.plan(1)
  toggle(1, 2)(
    action => t.deepEqual(action, expected),
    () => ({tiles: []})
  )
})

test('toggle should clear if a tile exist in position', t => {
  const expected = {type: 'CLEAR', x: 1, y: 2}

  t.plan(1)
  toggle(1, 2)(
    action => t.deepEqual(action, expected),
    () => ({tiles: [{x: 1, y: 2}]})
  )
})

test('setForeground generates correct payload', t => {
  const expected = {type: 'FOREGROUND', color: 'LightGoldenRodYellow'}

  t.plan(1)
  t.deepEqual(setForeground('LightGoldenRodYellow'), expected)
})
