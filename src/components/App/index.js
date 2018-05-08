import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducers from 'state/reducers'
import root from 'state/sagas'

import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

import Track from 'external/mixpanel'

import List from 'containers/ListContainer'
import Player from 'containers/PlayerContainer'
import Query from 'containers/QueryContainer'
import Controls from 'containers/ControlsContainer'
import Info from 'containers/InfoContainer'

import './style.css'
import 'styles/reset.css'
import 'styles/transitions.css'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['list']
}
const persistedReducers = persistReducer(persistConfig, reducers)

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  persistedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(
    thunk,
    sagaMiddleware
  ))
)
const persistor = persistStore(store)
sagaMiddleware.run(root)

/* ANALYTICS */
Track.ENTER_SITE()
window.onunload = () => Track.LEAVE_SITE()

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <main>
        <Player />
        <div className={`Top`}>
          <div className={`Top__left`}>
            <List />
          </div>
          <div className={`Top__right`}>
            <div className={`Top__info`}>
              <Info />
            </div>
            <div className={`Top__query`}>
              <Query />
            </div>
          </div>
        </div>
        <div className={`Bottom`}>
          <Controls />
        </div>
      </main>
    </PersistGate>
  </Provider>
)
