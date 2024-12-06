import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDMDa816jvwmlmqkguu13DrsGNCe1BUbYA",
  authDomain: "deshishop-33fe6.firebaseapp.com",
  projectId: "deshishop-33fe6",
  storageBucket: "deshishop-33fe6.appspot.com",
  messagingSenderId: "609127778065",
  appId: "1:609127778065:web:a55a0b40015878d36aeeb0",
  measurementId: "G-29S4W8Y2YS",
};

const app = initializeApp(firebaseConfig);
export const Storage = getStorage(app);
