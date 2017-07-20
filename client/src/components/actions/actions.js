export function setUser(user) {
  console.log('user in action: ', user);
  return {
    type: 'SET_USER',
    user: user
  }
}

export function addConference(conference) {
  return {
    type: 'ADD_CONFERENCE',
    conference: conference
  }
}

