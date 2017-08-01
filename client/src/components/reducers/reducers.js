import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
// import { events, eventsHasErrored, eventsAreLoading } from './'

const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {...action.user};
    case 'SET_USER_AVATAR_URL':
      return {...state, ...{avatarUrl: action.avatarUrl}};
    case 'ADD_USER_ID_FROM_DB':
      return {...state, ...{userID: action.userID}};
    default:
      return state;
  }
}

// using state = { data = [] } in order to set the initial state of the data prop to an empty array. I need this in order to have my app map through 'something'
const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {...state, ...{data: action.data}};
    case 'SET_CURRENT_CONF_ID':
      return {...state, ...{currentConfID: action.currentConfID}};
    case 'SET_ADMIN_SELECTED_CONFERENCE':
      return {...state, ...{selectedConference: action.selectedConference}};
    case 'SET_ADMIN_SELECTED_PRESENTATION':
      return {...state, ...{selectedPresentation: action.selectedPresentation}};
    case 'SET_SPEAKER_INITIAL_VALUES':
      return {...state, ...{speakerValues: action.speakerValues}};
    case 'SET_SPEAKERS_OF_CONF':
      return {...state, ...{speakers: action.speakers}};
    case 'SET_PRESENTATION_SPEAKERS':
      return {...state, ...{selectedPresentationSpeakers: action.selectedPresentationSpeakers}};
    case 'SET_PRESENTATIONS':
      return {...state, ...{presentations: action.presentations}};
    default:
      return state;
  }
}

const attendeeReducer = (state = {conference: null}, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CONFERENCE':
      return {...action.conference};
    default:
      return state;
  }
}

const reducers = combineReducers({
  userReducer,
  adminReducer,
  attendeeReducer,
  form: formReducer
})

export default reducers;