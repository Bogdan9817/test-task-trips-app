import TripsPage from "./pages/trips-page/TripsPage";
import UserInfoPage from "./pages/user-info-page/UserInfoPage";
import UsersPage from "./pages/users-page/UsersPage";

export const AdminMenuLinks = [
  {
    path: "/users",
    label: "Users Information",
    id: "users-info-menu-link301",
  },
  {
    path: "/trips",
    label: "Trips",
    id: "trips-info-menu-links",
  },
];

export const UserMenuLinks = [
  {
    path: "/user-info",
    label: "User Info",
    id: "user-info-menu-link123",
  },
  {
    path: "/trips",
    label: "Trips",
    id: "trips-info-menu-links",
  },
];

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
    path: "users",
    element: <UsersPage />,
  },
  {
    path: "trips",
    element: <TripsPage />,
  },
];
