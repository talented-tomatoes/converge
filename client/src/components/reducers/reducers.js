import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const userReducer = (state = { user: null }, action) => {
  console.log('action.type: ', action.type)
  switch (action.type) {
    case 'SET_USER':
      return {...action.user};
    default:
      return state;
  }
}

const adminReducer = (state = { conference: null }, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {...action.conference};
    case 'ADD_EVENT'
    default:
      return state;
  }
}

const reducers = combineReducers({
  userReducer,
  adminReducer,
  form: formReducer
})

export default reducers;