export function setSelectedConference(conference) {
  return {
    type: 'SET_SELECTED_CONFERENCE',
    conference: conference
  };
}

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user: user
  };
}