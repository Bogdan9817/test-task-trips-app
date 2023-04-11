import { useContext, useEffect } from "react";

import { useLocation, useNavigate, useRoutes } from "react-router-dom";

import withAuth from "../../hocs/withAuth";
import { GlobalContext } from "../../context/global/GlobalContext";

import { AdminRouter, UserRouter } from "../../routes/routes";

import Sidebar from "../../components/main/Sidebar";

function MainPage() {
  const { user } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate();
  const router = user?.role === "admin" ? AdminRouter : UserRouter;

  const route = useRoutes(router);

  useEffect(() => {
    if (location.pathname === "/") navigate(router[0].path);
  }, [location.pathname, navigate, router]);

  return (
    <div className='page main-page'>
      <Sidebar />
      {route}
    </div>
  );
}

export default withAuth(MainPage);
