// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2bgnKqJoGAeSxiGCjr8LFejYaY9GcQeA",
  authDomain: "realtor-react-db-eb72c.firebaseapp.com",
  projectId: "realtor-react-db-eb72c",
  storageBucket: "realtor-react-db-eb72c.appspot.com",
  messagingSenderId: "647481496141",
  appId: "1:647481496141:web:f7bb5b3f413d7477ac0204"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();