export function eventsHasErrored(state = false, action) {
  switch (action.type) {
  case 'EVENTS_HAS_ERRORED':
    return action.hasErrored;
  default:
    return state;
  }
}
export function itemsIsLoading(state = false, action) {
  switch (action.type) {
  case 'EVENTS_ARE_LOADING':
    return action.isLoading;
  default:
    return state;
  }
}
export function items(state = [], action) {
  switch (action.type) {
  case 'EVENTS_FETCH_DATA_SUCCESS':
    return action.items;
  default:
    return state;
  }
}
