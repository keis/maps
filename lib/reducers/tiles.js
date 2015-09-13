import find from 'component-find'
import { BRUSH, CLEAR } from './../actions/map'

export default function tiles (state = [], action) {
  switch (action.type) {
    case BRUSH:
      if (!find(state, {x: action.x, y: action.y})) {
        return [...state, {x: action.x, y: action.y}]
      }
      return state
    case CLEAR:
      return state.filter(p => p.x !== action.x || p.y !== action.y)
    default:
      return state
  }
}
