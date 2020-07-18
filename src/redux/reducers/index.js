import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

export default function createRootReducer(history) {
  const newLocal = combineReducers({
    router: connectRouter(history)
  })
  return newLocal
}
