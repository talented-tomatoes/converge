export function setUser(user) {
  console.log('user in action: ', user);
  return {
    type: 'SET_USER',
    user: user
  };
}

export function setInitialData(data) {
  console.log('data in action: ', data);
  return {
    type: 'SET_DATA',
    data: data
  };
}

