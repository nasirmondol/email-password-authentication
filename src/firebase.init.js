// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzWG11oq_1iWhGwjZkhLOWF1-V11BMayg",
  authDomain: "eamil-password-auth-86a94.firebaseapp.com",
  projectId: "eamil-password-auth-86a94",
  storageBucket: "eamil-password-auth-86a94.appspot.com",
  messagingSenderId: "947489809116",
  appId: "1:947489809116:web:8bf75a015d40f8b95d8a19",
  measurementId: "G-8ZLE4YCTFJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;