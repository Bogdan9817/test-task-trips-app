import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authorization as auth, database, providers } from "./firebase";
import { set, ref, get } from "firebase/database";

export const registerUserViaEmailAndPassword = async (userData, setUser) => {
  const { email, password, name } = userData;
  const creds = await createUserWithEmailAndPassword(auth, email, password);
  const role = "passenger";
  const uid = creds.user.uid;
  const userDataObj = { name, email, role, uid };
  await createUser(userDataObj);
  setUser({ uid, role });
};

export const loginWithEmailAndPassword = async (email, password, setUser) => {
  const creds = await signInWithEmailAndPassword(auth, email, password);
  const role = await getUserRole(creds.user.uid);
  setUser({ role, uid: creds.user.uid });
};

const createUser = async (userDataObj) => {
  await set(ref(database, "/users/" + userDataObj.uid), userDataObj);
};

const getUserRole = async (uid) => {
  return (await get(ref(database, "/users/" + uid + "/role"))).val();
};

const signInWithProvider = async (provider) => {
  return await signInWithPopup(auth, provider);
};

const signInWithProviderHelper = async (creds, setUser) => {
  const { displayName, email, uid } = creds.user;
  const role = await getUserRole(uid);
  if (!!role) {
    return setUser({ uid, role });
  }
  const userDataObj = {
    name: displayName,
    role: "passenger",
    uid,
    email,
  };
  await createUser(userDataObj);
  const userRole = await getUserRole(uid);
  setUser({ uid, role: userRole });
};

export const signInWithGoogle = async (setUser) => {
  const creds = await signInWithProvider(providers.google);
  await signInWithProviderHelper(creds, setUser);
};

export const signInWithFacebook = async (setUser) => {
  const creds = await signInWithProvider(providers.facebook);
  console.log(creds);
  await signInWithProviderHelper(creds, setUser);
};
