export function setUser(user) {
  return {
    type: 'SET_USER',
    user: user
  };
}

export function decorateUserWithAvatar(url) {
  console.log('decorateUserWithAvatar fired')
  return {
    type: 'SET_USER_AVATAR_URL',
    avatarUrl: url
  };
}

// action to get the data from the DB on page load of ADMINLANDING
export function setInitialHostData(data) {
  return {
    type: 'GET_EVENTS',
    data
  };
}

export function decorateUserWithDBUserID(userID) {
  return {
    type: 'ADD_USER_ID_FROM_DB',
    userID: userID
  };
}

export function decorateUserWithDBConferenceID(confID) {
  return {
    type: 'SET_CURRENT_CONF_ID',
    currentConfID: confID
  };
}

export function setSelectedConference(conference) {
  return {
    type: 'SET_SELECTED_CONFERENCE',
    conference: conference
  };
}

export function setAdminSelectedConference(conference) {
  return {
    type: 'SET_ADMIN_SELECTED_CONFERENCE',
    selectedConference: conference
  };
}

export function setSpeakerInitialValues(speakerValues) {
  // console.log('speaker action was called for setting values', speakerValues);
  return {
    type: 'SET_SPEAKER_INITIAL_VALUES',
    speakerValues: speakerValues
  };
}

export function setAdminSelectedPresentation(selectedPresentation) {
  return {
    type: 'SET_ADMIN_SELECTED_PRESENTATION',
    selectedPresentation
  };
}

export function setSpeakersOfConference(speakers) {
  return {
    type: 'SET_SPEAKERS_OF_CONF',
    speakers
  };
}

export function setPresentationSpeakers(selectedSpeakers) {
  return {
    type: 'SET_PRESENTATION_SPEAKERS',
    selectedSpeakers
  };
}