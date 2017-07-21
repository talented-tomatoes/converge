import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import { events, eventsHasErrored, eventsAreLoading } from './'

const userReducer = (state = { user: null }, action) => {
  console.log('action.type: ', action.type)
  switch (action.type) {
    case 'SET_USER':
      return {...action.user};
    default:
      return state;
  }
}

// As an admin, I want to have the state of all the events I am hosting
// I want it to be stored in an array
const adminReducer = (state = {data: null}, action) => {
  console.log('adminReducer, action=', action.type);
  switch (action.type) {
    case 'GET_EVENTS':
      console.log('action.data', action.data);
      return {...state, ...{data: action.data}};
    default:
      return state;
  }
}

// root reducers?
const reducers = combineReducers({
  userReducer,
  adminReducer,
  form: formReducer
})

export default reducers;