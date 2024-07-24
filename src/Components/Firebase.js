// Firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Ensure Firestore is imported

const firebaseConfig = {
    apiKey: "AIzaSyD0lxpD2HcsWtuNWodkT4tzDVTM7nGtsKo",
    authDomain: "mail-box-client-6cc6d.firebaseapp.com",
    databaseURL: "https://mail-box-client-6cc6d-default-rtdb.firebaseio.com",
    projectId: "mail-box-client-6cc6d",
    storageBucket: "mail-box-client-6cc6d.appspot.com",
    messagingSenderId: "612642648537",
    appId: "1:612642648537:web:3af14a8b415510e1c569c8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
