import { useContext } from "react";

import { GlobalContext } from "../context/global/GlobalContext";

import AuthPage from "../pages/auth-page/AuthPage";

export default function withAuth(Component) {
  return function WithAuth() {
    const { user } = useContext(GlobalContext);

    if (!!!user) {
      return <AuthPage />;
    }

    return <Component />;
  };
}
