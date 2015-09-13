import 'babel-core/lib/polyfill'

import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { devTools } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

import Editor from './lib/containers/editor'
import storage, { storedState } from './lib/middlewares/storage'
import color from './lib/reducers/color'
import tiles from './lib/reducers/tiles'

const init = storedState()
const reducer = combineReducers({
  color,
  tiles
})
const store = applyMiddleware(thunk, storage)(devTools()(createStore))(reducer, init)

React.render(
  React.createElement(
    'div', null,
    React.createElement(Provider, {store},
                        () => React.createElement(Editor)),
    React.createElement(DebugPanel, {top: true, right: true, bottom: true},
                        React.createElement(DevTools,
                                            {store, monitor: LogMonitor}))
  ),
  document.getElementById('app'))
