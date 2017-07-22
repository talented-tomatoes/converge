export function setUser(user) {
  return {
    type: 'SET_USER',
    user: user
  };
}

// action to get the data from the DB on page load of ADMINLANDING
export function setInitialHostData(data) {
  return {
    type: 'GET_EVENTS',
    data: data
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