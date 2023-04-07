import { database } from "./firebase";
import { ref, get, set } from "firebase/database";

export const getUsers = async () => {
  const users = (await get(ref(database, "users"))).val();
  const result = [];
  for (let key in users) {
    users[key].role !== "admin" && result.push(users[key]);
  }
  return result;
};

export const updateUserRole = async (newRole, uid) => {
  await set(ref(database, "/users/" + uid + "/role"), newRole);
};
