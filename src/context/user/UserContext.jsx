import { createContext, useReducer } from "react";
import reducer from "./reducer";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
}
