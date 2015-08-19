import compose from 'compose-function'

const KEY = 'maybe-a-map-editor';

const load = () => JSON.parse(window.localStorage.getItem(KEY))

// Initialise structure if no data was found
const init = (state) => state ? state : {tiles: []}

// Convert from old style where state was a list of tiles directly
const patch = (state) => state.tiles ? state : {tiles: state}

export const storedState = compose(patch, init, load)

export default function storage ({ getState }) {
  return (next) => (action) => {
    next(action)

    window.localStorage.setItem(KEY, JSON.stringify(getState()))
  }
}
