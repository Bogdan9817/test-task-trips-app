import React, { useEffect, useState } from "react";
export const GlobalContext = React.createContext();

let errorsTimeout;
let successTimeout;

export default function GlobalContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const successAlert = () => {
    clearTimeout(successTimeout);
    successTimeout = setTimeout(() => {
      setSuccessMsg(null);
    }, 5000);
  };

  const errorsAlert = () => {
    clearTimeout(errorsTimeout);
    errorsTimeout = setTimeout(() => {
      setErrors(null);
    }, 5000);
  };

  useEffect(() => {
    successAlert();
  }, [successMsg]);

  useEffect(() => {
    errorsAlert();
  }, [errors]);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, setErrors, errors, successMsg, setSuccessMsg }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
