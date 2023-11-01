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
 // FIREBASE CREDENTIALS HERE
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const dataref = firebase.firestore();
const storage = getStorage(firebaseApp)
const dbref = getDatabase(firebaseApp)

export { firebaseApp, auth, dataref, storage, dbref };

