// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI9lDA67DvjrI0C4FVa087kjXBt4tZ8NA",
  authDomain: "fir-notification-eb182.firebaseapp.com",
  projectId: "fir-notification-eb182",
  storageBucket: "fir-notification-eb182.appspot.com",
  messagingSenderId: "415985665556",
  appId: "1:415985665556:web:68a23d1d5f1ccca9178901",
  measurementId: "G-1E2734PS4D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
