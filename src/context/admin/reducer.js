const actionTypes = {
  LOAD_USERS: "LOAD_USERS",
  UPDATE_USER_ROLE: "UPDATE_USER_ROLE",
  LOAD_TRIPS: "LODA_TRIPS",
};

export const reducer = (state, action) => {
  switch (action.type) {
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
    case actionTypes.LOAD_TRIPS:
      return { ...state, trips: action.payload.data };
  }
};
