// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1F3pgYrA6CrTUUPArO6JEQE3JmBq0K8Y",
  authDomain: "connectify-e8342.firebaseapp.com",
  projectId: "connectify-e8342",
  storageBucket: "connectify-e8342.firebasestorage.app",
  messagingSenderId: "405890544629",
  appId: "1:405890544629:web:c2ef5777af2b5b2b0ba6bc",
  measurementId: "G-D08K6Q22D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);