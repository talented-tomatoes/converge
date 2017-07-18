import { createStore, applyMiddleware } from 'redux';
import reducers from './components/reducers/reducers';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(reducers, applyMiddleware(thunk));
}