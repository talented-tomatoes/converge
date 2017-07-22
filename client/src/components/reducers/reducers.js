import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import { events, eventsHasErrored, eventsAreLoading } from './'

const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...action.user};
    case 'ADD_USER_ID_FROM_DB':
      return {...state, ...{userID: action.userID}}
    default:
      return state;
  }
}

// As an admin, I want to have the state of all the events I am hosting
// I want it to be stored in an array
const adminReducer = (state = {data: null}, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {...state, ...{data: action.data}};
    case 'SET_CURRENT_CONF_ID':
      console.log('inside set conference case');
      return {...state, ...{currentConfID: action.currentConfID}}
    default:
      return state;
  }
}

const attendeeReducer = (state = {conference: null}, action) => {
  console.log('attendee Reducer Called')
  switch (action.type) {
    case 'SET_SELECTED_CONFERENCE':
      console.log('SETTING CONFERENCE ==>', {...action.conference})
      return {...action.conference}
    default:
      return state;
  }
}

// root reducers?
const reducers = combineReducers({
  userReducer,
  adminReducer,
  attendeeReducer,
  form: formReducer
})

export default reducers;