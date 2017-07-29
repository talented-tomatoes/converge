import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

const conferenceReducer = (state = {}, action) => {
  // console.log('attendee Reducer Called')
  switch (action.type) {
    case 'SET_SELECTED_CONFERENCE':
      console.log('SETTING CONFERENCE ==>', {...action.conference})
      return {...state, ...{selectedConference: action.conference}}
    default:
      return state;
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {...state, ...{currentUser: action.user}};
    default:
      return state;
  }
}

const reducers = combineReducers({
  userReducer,
  conferenceReducer,
  routing: routerReducer,
  form: formReducer
})

export default reducers;