import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducers.js';
import {USERS_API_URL} from './actions';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument(USERS_API_URL))
  )
)