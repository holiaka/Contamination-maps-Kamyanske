// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, 
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8RFsBm5a5h94uLU90TLHrczpRd2TC8ls',
  authDomain: 'phz-project.firebaseapp.com',
  projectId: 'phz-project',
  storageBucket: 'phz-project.appspot.com',
  messagingSenderId: '252512082529',
  appId: '1:252512082529:web:92415c751e6f3e72d0e820',
  measurementId: 'G-720F61ZQSX',
  databaseURL:
    'https://phz-project.europe-west1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

// Define an asynchronous function
export async function registrationFetch(email, password) {
  try {
    // Await the promise from createUserWithEmailAndPassword
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed up
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Catch and handle any errors
    return error.message;   
  }
}

export const signInFetch = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    return error.message;
  }
};

export const signOutFeatch = async () => {
  try {
    await signOut(auth);
    return 'success';
  } catch (error) {
    return error;
  }
};

export const changePassword = async (newPassword) => {
  try {
    const user = auth.currentUser;    
    await updatePassword(user, newPassword);    
    return 'success';
  } catch (error) {    
    return error.message;
  }
};

export const onRemoveAccouant = () => {
  try {
    const user = auth.currentUser;
    const data = deleteUser(user);    
    // User deleted
    return data;
  } catch (error) {    
    // An error ocurred
    return error.message;
  }
};

const dbRef = ref(db);
export const geoFetch = async id => {
  try {
    const snapshot = await get(child(dbRef, `radiation-data/${id}`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      console.log('No data available');
    }
  } catch (error) {
    return error.message;
  }
};
