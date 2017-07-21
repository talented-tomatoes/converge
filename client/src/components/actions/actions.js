export function setUser(user) {
  console.log('user in action: ', user);
  return {
    type: 'SET_USER',
    user: user
  };
}

// action to get the data from the DB on page load of ADMINLANDING
export function setInitialHostData(data) {
  console.log('data in action: ', data);
  console.log('typeof data in action', Array.isArray(data));
  
  return {
    type: 'GET_EVENTS',
    data: data
  };
}

