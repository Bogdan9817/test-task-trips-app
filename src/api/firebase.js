import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBIm3SxsVszMUeiJzOkH4t5C22MfhJe1JQ",
  authDomain: "testtask-7518f.firebaseapp.com",
  databaseURL:
    "https://testtask-7518f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testtask-7518f",
  storageBucket: "testtask-7518f.appspot.com",
  messagingSenderId: "781249658530",
  appId: "1:781249658530:web:aacd31ace66e75052421fb",
};

const firebase = initializeApp(firebaseConfig);
export const authorization = getAuth(firebase);
export const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export const database = getDatabase(firebase);
