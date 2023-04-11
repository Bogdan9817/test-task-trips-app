import { useContext, useEffect, useState, useCallback } from "react";

import { getUsers } from "../../api/admin";

import { AdminContext } from "../../context/admin/AdminContext";

import UsersList from "../../components/users/UsersList";

import text from "./text.json";
import Loader from "../../UI/loader/Loader";

export default function UsersPage() {
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useContext(AdminContext);

  const loadUsers = useCallback(async () => {
    setLoad(true);
    try {
      const data = await getUsers();
      dispatch({
        type: "LOAD_USERS",
        payload: {
          data,
        },
      });
    } catch (e) {
      setError(e.message);
    }
    setLoad(false);
  }, [dispatch]);

  useEffect(() => {
    state.users.length === 0 && loadUsers();
  }, [loadUsers, state.users.length]);

  if (load) {
    return <Loader />;
  }

  if (error) {
    return <span>{text.errorHandler}</span>;
  }

  return (
    <div className='content-wrapper'>
      <div className='heading'>
        <h2>{text.heading}</h2>
      </div>
      <UsersList />
    </div>
  );
}
