import find from 'component-find'

export const CLEAR = 'CLEAR'
export const BRUSH = 'BRUSH'
export const FOREGROUND = 'FOREGROUND'

export function clear (x, y) {
  return {
    type: CLEAR,
    x,
    y
  }
}

export function brush (x, y) {
  return {
    type: BRUSH,
    x,
    y
  }
}

export function toggle (x, y) {
  return (dispatch, getState) => {
    const { tiles } = getState()

    if (tiles && find(tiles, {x, y})) {
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
