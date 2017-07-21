export function eventsHasErrored(bool) {
  return {
    type: 'EVENTS_HAS_ERRORED',
    hasErrored: bool
  };
}

export function eventsAreLoading(bool) {
  return {
    type: 'EVENTS_ARE_LOADING',
    isLoading: bool
  };
}

export function eventsFetchDataSuccess(events) {
  // returns an action
  return {
    type: 'EVENT_FETCH_DATA_SUCCESS',
    events
  };
}


export function eventsFetchData(url) {
  return (dispatch) => {
    dispatch(eventsAreLoading(true));

    // write api call here?
    axios.post('apiURL', details)
      .then((response) => {
        dispatch(eventsFetchDataSuccess(response));
        console.log(response);
      })
      .catch(() => {
        dispatch(eventsHasErrored(true));
      });
  };
}