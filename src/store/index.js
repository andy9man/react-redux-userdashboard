import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducers.js';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk.withExtraArgument('http://5a74994008118e0012fd4c84.mockapi.io')),
  )
)