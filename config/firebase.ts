import { initializeApp } from 'firebase/app';
import { initializeAuth } from "firebase/auth";
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore/lite'
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqp9qBGHEK7gatkLBQhGhBrJFNgMXnVpA",
    authDomain: "clubhub-68525.firebaseapp.com",
    projectId: "clubhub-68525",
    storageBucket: "clubhub-68525.appspot.com",
    messagingSenderId: "40378079032",
    appId: "1:40378079032:web:f339133f4d36a57060d3cd",
    measurementId: "G-K0PJR3WE0S"
};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);