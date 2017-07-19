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

const conferenceReducer = (state = { conference: null }, action) => {
  return state;
}

const reducers = combineReducers({
  userReducer,
  conferenceReducer
  //
})

export default reducers;