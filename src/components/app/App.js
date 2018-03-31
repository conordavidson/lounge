import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from '../../reducers';
import Player from '../../containers/PlayerContainer';
import Query from '../../containers/QueryContainer';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(thunk))
)

const App = () => (
  <Provider store={store}>
    <main>
      <Query/>
      <Player/>
    </main>
  </Provider>
);

export default App;
