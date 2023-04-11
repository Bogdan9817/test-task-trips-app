import TripsPage from "../pages/trips-page/TripsPage";
import UserInfoPage from "../pages/user-info-page/UserInfoPage";
import UsersPage from "../pages/users-page/UsersPage";

export const UserRouter = [
  {
    path: "user-info",
    element: <UserInfoPage />,
  },
  {
    path: "trips",
    element: <TripsPage />,
  },
];

export const AdminRouter = [
  {
    path: "user-info",
    element: <UserInfoPage />,
  },
  {
    path: "users",
    element: <UsersPage />,
  },
  {
    path: "trips",
    element: <TripsPage />,
  },
];
