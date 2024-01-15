// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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
export const app = initializeApp(firebaseConfig);

const auth = getAuth();

// Define an asynchronous function
export async function registrationFetch(email, password) {
    try {
        // Await the promise from createUserWithEmailAndPassword
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Signed up
        const user = userCredential.user;
      return user;
    } catch (error) {
        // Catch and handle any errors
      return error.message;
        // ...additional error handling logic if needed
    }
}

export const signInFetch = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(userCredential);
    return user;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const signOutFeatch = async () => {
  try {
    const data = await signOut(auth);
    console.log('signOutFeatchSecsses', data);
    return data;
  } catch (error) {
    console.log('signOutFeatchError', error);
    return error;
  }
};
