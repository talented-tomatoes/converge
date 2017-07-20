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

const conferenceReducer = (state = { conference: null }, action) => {
  switch (action.type) {
    case 'ADD_CONFERENCE':
      return Object.assign(state, {conference: action.conference})
    default:
      return state;
  }
}

const reducers = combineReducers({
  userReducer,
  conferenceReducer,
  form: formReducer
})

export default reducers;