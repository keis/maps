import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Editor from './lib/editor'
import { devTools } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { reduce } from './lib/map'

let store = applyMiddleware(thunk)(devTools()(createStore))(reduce)

React.render(
  React.createElement(
    'div', null,
    React.createElement(Provider, {store},
                        () => React.createElement(Editor)),
    React.createElement(DebugPanel, {top: true, right: true, bottom: true},
                        React.createElement(DevTools, {store, monitor: LogMonitor})),
  ),
  document.getElementById('app'))
