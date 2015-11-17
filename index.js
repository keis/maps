import 'babel-core/lib/polyfill'

import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { devTools } from 'redux-devtools'
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'

import Editor from './lib/containers/editor'
import storage, { storedState } from './lib/middlewares/storage'
import reducer from './lib/reducers'

const init = storedState()
const store = applyMiddleware(thunk, storage)(devTools()(createStore))(reducer, init)

React.render(
  <div>
    <Provider store={store}>
      <Editor/>
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('app'))
