import { get, ref, set } from "firebase/database";
import { database } from "./firebase";

export const updateUserData = async ({ age, phone, uid }) => {
  age && (await set(ref(database, "/users/" + uid + "/age"), age));
  phone && (await set(ref(database, "/users/" + uid + "/phone"), phone));
};

export const getUserData = async (uid) => {
  return (await get(ref(database, "/users/" + uid))).val();
};
