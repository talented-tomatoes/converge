import { createStore, applyMiddleware } from 'redux';
import reducers from './components/reducers/reducers';
import thunk from 'redux-thunk';

// below is for if you want ot set up redux Dev tools to see state
// const enhancers = compose(
//   window.devlToolsExtension ? window.devlToolsExtension() : f => f
// );

export default function configureStore() {
  return createStore(reducers, applyMiddleware(thunk));
}