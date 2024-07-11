// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOlOEvOiTK1Zknz0iSrOOJfWQzC7qS5e8",
  authDomain: "react-course-c6128.firebaseapp.com",
  projectId: "react-course-c6128",
  storageBucket: "react-course-c6128.appspot.com",
  messagingSenderId: "872780971327",
  appId: "1:872780971327:web:5a236001943e15f3d3678a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)