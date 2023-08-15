// src/config/firebase.ts
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/analytics'; // Import analytics if you need it
import '@react-native-firebase/auth'; // Import auth if you need it


const firebaseConfig = {
  apiKey: "AIzaSyCyHl9lvQU_-oC_JRTdIDE-lldYxm4Lgl4",
  authDomain: "mybook-14c19.firebaseapp.com",
  databaseURL: "https://mybook-14c19.firebaseio.com",
  projectId: "mybook-14c19",
  storageBucket: "mybook-14c19.appspot.com",
  messagingSenderId: "123078711220",
  appId: "1:123078711220:web:3a1e07a7097d2c197c44e1",
  measurementId: "G-QLMPBDZ02H"
};

// Initialize Firebase if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth(); // Initialize Firebase Auth

export { auth };