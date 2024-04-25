// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyDybZ0UEeKGF0NDzmv0XY9sIuLQeF_FVQY",
  // authDomain: "conference-management-sy-ed290.firebaseapp.com",
  // projectId: "conference-management-sy-ed290",
  // storageBucket: "conference-management-sy-ed290.appspot.com",
  // messagingSenderId: "984812618294",
  // appId: "1:984812618294:web:48c2a487a231c01574ce97",


    apiKey: "AIzaSyC0eqaFm0F0NraYacO-j0kX3-IFaPUhCZA",
  authDomain: "react-ea708.firebaseapp.com",
  databaseURL: "https://react-ea708-default-rtdb.firebaseio.com",
  projectId: "react-ea708",
  storageBucket: "react-ea708.appspot.com",
  messagingSenderId: "1032618754004",
  appId: "1:1032618754004:web:2ac280ac62239f9a0fe041",
  measurementId: "G-GY3815FZ5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);

export const projectsCollection = collection(db, "projects");
