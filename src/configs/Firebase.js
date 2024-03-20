// Firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import firebaseConfig from './FirebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);

const messaging = getMessaging(firebaseApp);

export { firebaseApp, messaging };
