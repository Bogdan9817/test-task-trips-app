import { useRoutes } from "react-router-dom";
import Sidebar from "../../components/main/Sidebar";
import withAuth from "../../hocs/withAuth";

import { AuthContext } from "../../context/auth/AuthContext";
import { AdminRouter, UserRouter } from "../../routes";
import { useContext } from "react";

function MainPage() {
  const { user } = useContext(AuthContext);
  let router = user?.role === "admin" ? AdminRouter : UserRouter;
  const route = useRoutes(router);

  return (
    <div className='page main-page'>
      <Sidebar />
      {route}
    </div>
  );
}

export default withAuth(MainPage);
