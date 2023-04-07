const actionTypes = {
  LOAD_TRIPS: "LOAD_TRIPS",
};

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.LOAD_TRIPS:
      return { ...state, trips: action.payload.data };
  }
}
