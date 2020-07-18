import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import createRootReducer from './redux/reducers'
import history from './utils/history'

const rootReducer = createRootReducer(history)

const composeEnhancers = composeWithDevTools({
  name: 'BudgetManager'
})

const loggerMiddleware = createLogger({ predicate: (getState, action) => true })

export default function store(preloadedState) {
  const store = createStore(
    connectRouter(history)(rootReducer),
    preloadedState,
    composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware, routerMiddleware(history)))
  )

  if (module.hot) {
    module.hot.accept('./redux/reducers', () => {
      store.replaceReducer(connectRouter(history)(rootReducer))
    })
  }

  return store
}
