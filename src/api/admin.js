import { database } from "./firebase";
import { ref, get, set, remove } from "firebase/database";

export const getUsers = async () => {
  const users = (await get(ref(database, "users"))).val();
  const result = [];
  for (let key in users) {
    users[key].role !== "admin" && result.push(users[key]);
  }
  return result;
};

export const updateUserRole = async (newRole, uid) => {
  const currentUserRole = (
    await get(ref(database, "/users/" + uid + "/role"))
  ).val();
  if (currentUserRole === "driver") {
    await remove(ref(database, "/trips/" + uid));
  }
  await set(ref(database, "/users/" + uid + "/role"), newRole);
};

export const deleteUser = async (uid) => {
  const currentUserRole = (
    await get(ref(database, "/users/" + uid + "/role"))
  ).val();
  if (currentUserRole === "driver") {
    await remove(ref(database, "/cars/" + uid));
    await remove(ref(database, "/trips/" + uid));
  }

  await remove(ref(database, "/users/" + uid));
};
