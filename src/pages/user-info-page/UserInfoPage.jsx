import { useCallback, useContext, useEffect, useState } from "react";

import { getUserData } from "../../api/user";

import { GlobalContext } from "../../context/global/GlobalContext";
import { UserContext } from "../../context/user/UserContext";

import UserInformation from "../../components/user/UserInformation";

import text from "./text.json";
import Loader from "../../UI/loader/Loader";

function UserInfoPage() {
  const { state, dispatch } = useContext(UserContext);
  const { user } = useContext(GlobalContext);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);
  const loadData = useCallback(async () => {
    setLoad(true);
    try {
      const userInfo = await getUserData(user.uid);
      dispatch({
        type: "GET_USER_INFO",
        payload: {
          data: userInfo,
        },
      });
    } catch (e) {
      setError(e.message);
    }

    setLoad(false);
  }, [dispatch, user.uid]);

  useEffect(() => {
    !state.user && loadData();
  }, [loadData, state.user]);

  if (load) {
    return <Loader />;
  }

  if (error) {
    return <span>{text.errorHandler}</span>;
  }

  return (
    <div className='content-wrapper'>
      {state.user && (
        <>
          <div className='heading'>
            <h2>{text.heading + " " + state.user.name}</h2>
          </div>
          <UserInformation />
        </>
      )}
    </div>
  );
}

export default UserInfoPage;
