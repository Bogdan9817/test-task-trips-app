import { useContext, useEffect, useState, useCallback } from "react";
import { getUsers } from "../../api/admin";
import { Display3 } from "bootstrap-4-react/lib/components/Display";
import UsersList from "../../components/users/UsersList";
import { AdminContext } from "../../context/admin/AdminContext";

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='content-wrapper'>
      <Display3>Users</Display3>
      <UsersList />
    </div>
  );
}
