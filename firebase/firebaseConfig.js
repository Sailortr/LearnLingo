import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmDusi2BcT_kI41oyNMlHVJUTyPtXG774",
  authDomain: "learnlingo-91779.firebaseapp.com",
  projectId: "learnlingo-91779",
  storageBucket: "learnlingo-91779.appspot.com",
  messagingSenderId: "790776929036",
  appId: "1:790776929036:web:ca871933060c505f3fc729",
  measurementId: "G-48J8HBESY6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
