import { useContext } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import GlobalContextProvider, {
  GlobalContext,
} from "./context/global/GlobalContext";
import AdminContextProvider from "./context/admin/AdminContext";
import UserContextProvider from "./context/user/UserContext";

import { AdminRouter, UserRouter } from "./routes/routes";

import MainPage from "./pages/main-page/MainPage";

import "./App.css";
import ErrorAlert from "./components/main/ErrorAlert";
import SuccessAlert from "./components/main/SuccessAlert";
import ErrorPage from "./pages/error-page/ErrorPage";

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: UserRouter,
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: "*",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: AdminRouter,
  },
]);

function Router() {
  const { user } = useContext(GlobalContext);

  if (user?.role === "admin") {
    return (
      <AdminContextProvider>
        <UserContextProvider>
          <RouterProvider router={adminRouter} />
          <ErrorAlert />
          <SuccessAlert />
        </UserContextProvider>
      </AdminContextProvider>
    );
  }

  return (
    <UserContextProvider>
      <RouterProvider router={userRouter} />
      <ErrorAlert />
      <SuccessAlert />
    </UserContextProvider>
  );
}

function App() {
  return (
    <GlobalContextProvider>
      <Router />
    </GlobalContextProvider>
  );
}

export default App;
