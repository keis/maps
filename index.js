import 'babel-core/lib/polyfill'

import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Editor from './lib/editor'
import { devTools } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { reduce } from './lib/map'
import storage, { storedState } from './lib/storage'

const init = storedState() || []
const store = applyMiddleware(thunk, storage)(devTools()(createStore))(reduce, init)

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
