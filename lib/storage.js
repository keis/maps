const KEY = 'maybe-a-map-editor';

export const storedState = () => JSON.parse(window.localStorage.getItem(KEY))

export default function storage ({ getState }) {
  return (next) => (action) => {
    next(action)

    window.localStorage.setItem(KEY, JSON.stringify(getState()))
  }
}
