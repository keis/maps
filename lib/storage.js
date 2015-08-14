const KEY = 'maybe-a-map-editor';

export const storedState = () => patch(JSON.parse(window.localStorage.getItem(KEY)))

// Convert from old style where state was a list of tiles directly
const patch = (state) => state.tiles ? state : {tiles: state}

export default function storage ({ getState }) {
  return (next) => (action) => {
    next(action)

    window.localStorage.setItem(KEY, JSON.stringify(getState()))
  }
}
