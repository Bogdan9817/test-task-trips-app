import { createContext, useReducer, useState } from "react";
import { reducer } from "./reducer";

export const AdminContext = createContext();

export default function AdminContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { users: [] });
  return (
    <AdminContext.Provider value={{ state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
}
