import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducers from 'state/reducers'
import root from 'state/sagas'

import createSagaMiddleware from 'redux-saga'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import List from 'containers/ListContainer'
import Player from 'containers/PlayerContainer'
import Query from 'containers/QueryContainer'
import Controls from 'containers/ControlsContainer'
import Info from 'containers/InfoContainer'

import './style.css'
import 'styles/reset.css'
import 'styles/transitions.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(
    thunk,
    sagaMiddleware,
    promiseMiddleware(),
  ))
)
sagaMiddleware.run(root)

export default () => (
  <Provider store={store}>
    <main>
      <Player />
      <div className={`Top`}>
        <div className={`Top__left`}>
          <List />
        </div>
        <div className={`Top__right`}>
          <Info />
          <Query />
        </div>
      </div>
      <div className={`Bottom`}>
        <Controls />
      </div>
    </main>
  </Provider>
)
