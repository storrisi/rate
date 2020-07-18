import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import './index.css'
import App from './pages/App'
import * as serviceWorker from './serviceWorker'

import history from './utils/history'
import configureStore from './store'

const store = configureStore()

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store} history={history}>
        <ConnectedRouter history={history}>
          <Component />
        </ConnectedRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./pages/App', () => {
    render(App)
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
