import { FOREGROUND } from './../actions/map'

export default function color (state = null, action) {
  switch (action.type) {
    case FOREGROUND:
      return action.color
    default:
      return state
  }
}
