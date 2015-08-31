import find from 'component-find'

const CLEAR = 'CLEAR'
const BRUSH = 'BRUSH'
const FOREGROUND = 'FOREGROUND'

export function clear (x, y) {
  return {
    type: CLEAR,
    x: x,
    y: y
  }
}

export function brush (x, y) {
  return {
    type: BRUSH,
    x: x,
    y: y
  }
}

export function toggle (x, y) {
  return (dispatch, getState) => {
    const { tiles } = getState()

    if (tiles && find(tiles, {x: x, y: y})) {
      dispatch(clear(x, y))
    } else {
      dispatch(brush(x, y))
    }
  }
}

export function setForeground (color) {
  return {
    type: FOREGROUND,
    color
  }
}

export function reduce (state = {tiles: []}, action) {
  switch (action.type) {
    case BRUSH:
      if (!find(state.tiles, {x: action.x, y: action.y})) {
        return {
          ...state,
          tiles: [...state.tiles, {x: action.x, y: action.y}]
        }
      }
      return state
    case CLEAR:
      return {
        ...state,
        tiles: state.tiles.filter(p => p.x !== action.x || p.y !== action.y)
      }
    case FOREGROUND:
      return {
        ...state,
        color: action.color
      }
    default:
      return state
  }
}
