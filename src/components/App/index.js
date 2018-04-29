import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducers from 'state/reducers'

import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import Player from 'containers/PlayerContainer'
import Query from 'containers/QueryContainer'
import Controls from 'containers/ControlsContainer'
import Info from 'containers/InfoContainer'

import './style.css'
import 'styles/reset.css'
import 'styles/transitions.css'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(
    thunk,
    promiseMiddleware()
  ))
)

export default () => (
  <Provider store={store}>
    <main>
      <Player />
      <Query />
      <Controls />
      <Info />
    </main>
  </Provider>
)
