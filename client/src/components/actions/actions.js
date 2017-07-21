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

