// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIxEIVMMZ7YBHbC19qM5Gn43YWs7qZmaQ",
  authDomain: "expenses-2f29b.firebaseapp.com",
  projectId: "expenses-2f29b",
  storageBucket: "expenses-2f29b.appspot.com",
  messagingSenderId: "336321869215",
  appId: "1:336321869215:web:dcfa3189a1ca9c4ed679aa",
  databaseURL: "https://expenses-2f29b-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);