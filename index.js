import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Editor from './lib/editor'
import { reduce } from './lib/map'

let store = applyMiddleware(thunk)(createStore)(reduce)

React.render(React.createElement(Provider, {store},
                                 () => React.createElement(Editor)),
             document.getElementById('app'))
