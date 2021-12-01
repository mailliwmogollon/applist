// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: 'AIzaSyCujK6as6WNqkQ3pFWbg5w2dTYIIBfEj_I',
  authDomain: 'applist-a65db.firebaseapp.com',
  projectId: 'applist-a65db',
  storageBucket: 'applist-a65db.appspot.com',
  messagingSenderId: '32451106915',
  appId: '1:32451106915:web:684ae85823f6da28040056',
};

const firebaseInstance = initializeApp(firebaseConfig);
const db = getFirestore(firebaseInstance);

export { db };
