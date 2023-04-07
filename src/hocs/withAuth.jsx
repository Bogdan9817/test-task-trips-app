import { useContext, useState } from "react";
import AuthPage from "../pages/auth-page/AuthPage";
import { AuthContext } from "../context/auth/AuthContext";

export default function withAuth(Component) {
  return function WithAuth() {
    const { user } = useContext(AuthContext);

    if (!!!user) {
      return <AuthPage />;
    }

    return <Component />;
  };
}
