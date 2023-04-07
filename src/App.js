import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./context/auth/AuthContext";
import MainPage from "./pages/main-page/MainPage";
import "./App.css";

import { AdminRouter, UserRouter } from "./routes";
import { useContext } from "react";
import AdminContextProvider from "./context/admin/AdminContext";

const userRouter = createBrowserRouter([
  {
    path: "*",
    element: <MainPage />,
    children: UserRouter,
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "*",
    element: <MainPage />,
    children: AdminRouter,
  },
]);

function Router() {
  const { user } = useContext(AuthContext);

  if (user?.role === "admin") {
    return (
      <AdminContextProvider>
        <RouterProvider router={adminRouter} />
      </AdminContextProvider>
    );
  }

  return <RouterProvider router={userRouter} />;
}

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
