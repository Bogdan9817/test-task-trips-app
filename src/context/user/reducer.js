const actionTypes = {
  LOAD_TRIPS: "LOAD_TRIPS",
  ADD_TRIP: "ADD_TRIP",
  GET_USER_INFO: "GET_USER_INFO",
  UPDATE_USER_INFO: "UPDATE_USER_INFO",
};

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.LOAD_TRIPS:
      return { ...state, trips: action.payload.data };
    case actionTypes.ADD_TRIP:
      return { ...state, trips: [...state.trips, action.payload.data] };
    case actionTypes.GET_USER_INFO:
      return { ...state, user: action.payload.data };
    case actionTypes.UPDATE_USER_INFO:
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
}
