const actionTypes = {
  GET_USER_INFO: "GET_USER_INFO",
  LOAD_USERS: "LOAD_USERS",
  UPDATE_USER_ROLE: "UPDATE_USER_ROLE",
  DELETE_USER: "DELETE_USER",
  LOAD_TRIPS: "LODA_TRIPS",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_INFO:
      return { ...state, user: action.payload.data };
    case actionTypes.LOAD_USERS:
      return { ...state, users: action.payload.data };
    case actionTypes.UPDATE_USER_ROLE:
      state.users.forEach((user) => {
        if (user.uid === action.payload.uid) {
          user.role = action.payload.role;
        }
        return user;
      });
      return state;
    case actionTypes.DELETE_USER:
      const updatedUsers = state.users.filter(
        (user) => user.uid !== action.payload.uid
      );
      return { ...state, users: updatedUsers };
    case actionTypes.LOAD_TRIPS:
      return { ...state, trips: action.payload.data };
    default:
      return state;
  }
};
