import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9ayCeKihUUzwnv-Xm-4v7gw7_hMU0f_M",
  authDomain: "journal-app-517c4.firebaseapp.com",
  projectId: "journal-app-517c4",
  storageBucket: "journal-app-517c4.appspot.com",
  messagingSenderId: "1085833727324",
  appId: "1:1085833727324:web:c46e9b3e4d321058f90599",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth();

export {
  db,
  auth,
  provider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
};
