import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAJVf62dO8nyD9v-8ZoP2uNIW6VNBKZa7o",
    authDomain: "dm-tools-fd55a.firebaseapp.com",
    projectId: "dm-tools-fd55a",
    storageBucket: "dm-tools-fd55a.appspot.com",
    messagingSenderId: "57158610461",
    appId: "1:57158610461:web:bd1837375d6695b77220f4",
    measurementId: "G-8E47S5JWGX"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });