import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const reducer = combineReducers(Object.assign({}, reducers))

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
  applyMiddleware(ReduxThunk),
)

const store = createStore(reducer, enhancer)

export default store