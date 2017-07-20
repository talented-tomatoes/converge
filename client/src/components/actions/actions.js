export function setUser(user) {
  console.log('user in action: ', user);
  return {
    type: 'SET_USER',
    user: user
  };
}

export function setInitialHostData(data) {
  console.log('data in action: ', data);
  console.log('typeof data in action', Array.isArray(data));
  
  return {
    type: 'GET_EVENTS',
    data
  };
}

export function addConference(conference) {
  return {
    type: 'ADD_CONFERENCE',
    conference: conference
  };
}

