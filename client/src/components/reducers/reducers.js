import { combineReducers } from 'redux';

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
    case 'SET_EVENT':
      return {...action.conference};
    default:
      return state;
  }
}

const reducers = combineReducers({
  userReducer,
  adminReducer
})

export default reducers;