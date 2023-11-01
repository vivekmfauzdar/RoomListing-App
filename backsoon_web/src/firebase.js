// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {getStorage} from 'firebase/storage'
import { getDatabase} from 'firebase/database'
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe_G9IjVYEMzSxpE6Ap0HZ4vZfudBO5Dk",
  authDomain: "backsoon-b45d6.firebaseapp.com",
  databaseURL: "https://backsoon-b45d6-default-rtdb.firebaseio.com",
  projectId: "backsoon-b45d6",
  storageBucket: "backsoon-b45d6.appspot.com",
  messagingSenderId: "812143748962",
  appId: "1:812143748962:web:b2fcd26f7adfcba99e6e3b",
  measurementId: "G-TSCZL915CM"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const dataref = firebase.firestore();
const storage = getStorage(firebaseApp)
const dbref = getDatabase(firebaseApp)

export { firebaseApp, auth, dataref, storage, dbref };

