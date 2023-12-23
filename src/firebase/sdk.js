// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8RFsBm5a5h94uLU90TLHrczpRd2TC8ls",
  authDomain: "phz-project.firebaseapp.com",
  projectId: "phz-project",
  storageBucket: "phz-project.appspot.com",
  messagingSenderId: "252512082529",
  appId: "1:252512082529:web:92415c751e6f3e72d0e820",
  measurementId: "G-720F61ZQSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);