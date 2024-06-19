import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAiMfjnOMJhIRc2QSgYabCwvO_Ovr18AM",
  authDomain: "moneytracker-10.firebaseapp.com",
  projectId: "moneytracker-10",
  storageBucket: "moneytracker-10.appspot.com",
  messagingSenderId: "1005596763334",
  appId: "1:1005596763334:web:e61f1e7b90117f4574a3c7",
  measurementId: "G-PG81KX0P3Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const db = getFirestore(app);