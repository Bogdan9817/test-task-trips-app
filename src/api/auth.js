import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authorization, database, providers } from "./firebase";
import { set, ref, get } from "firebase/database";

export const registerUserViaEmailAndPassword = async (userData, setUser) => {
  const creds = await createUserWithEmailAndPassword(
    authorization,
    userData.email,
    userData.password
  );
  const userDataObj = {
    name: userData.name,
    email: userData.email,
    age: userData.age,
    role: "passenger",
    uid: creds.user.uid,
  };
  await createUser(userDataObj);
  const user = await getUser(userDataObj.uid);
  setUser(user);
};

export const loginWithEmailAndPassword = async (email, password, setUser) => {
  const creds = await signInWithEmailAndPassword(
    authorization,
    email,
    password
  );
  const user = await getUser(creds.user.uid);
  setUser(user);
};

const createUser = async (userDataObj) => {
  await set(ref(database, "/users/" + userDataObj.uid), userDataObj);
};

const getUser = async (uid) => {
  const data = (await get(ref(database, "/users/" + uid))).val();
  return data;
};

const signInWithProvider = async (provider) => {
  return await signInWithPopup(authorization, provider);
};

export const signInWithGoogle = async (setUser) => {
  const creds = await signInWithProvider(providers.google);
  const userDataObj = {
    name: creds.user.displayName,
    email: creds.user.email,
    uid: creds.user.uid,
    role: "passenger",
  };
  const userExists = await getUser(userDataObj.uid);
  if (userExists) {
    setUser(userExists);
    return;
  }
  await createUser(userDataObj);
  const user = await getUser(userDataObj.uid);
  setUser(user);
};
export const signInWithFacebook = (setUser) => {
  return signInWithProvider(providers.facebook);
};
