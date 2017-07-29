export function setSelectedConference(conference) {
  return {
    type: 'SET_SELECTED_CONFERENCE',
    conference: conference
  };
}

export function setSelectedSpeaker(speaker) {
  return {
    type: 'SET_SELECTED_SPEAKER',
    speaker: speaker
  };
}

export function setSelectedPresentation(presentation) {
  return {
    type: 'SET_SELECTED_PRESENTATION',
    presentation: presentation
  };
}

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user: user
  };
}
