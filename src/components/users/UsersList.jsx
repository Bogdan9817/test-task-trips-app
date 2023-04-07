import { useContext } from "react";
import { AdminContext } from "../../context/admin/AdminContext";
import UserCard from "./UserCard";

export default function UsersList() {
  const { state } = useContext(AdminContext);

  return (
    <div>
      {state?.users.map((user) => {
        return <UserCard key={"unique-user" + user.uid} {...user} />;
      })}
    </div>
  );
}
