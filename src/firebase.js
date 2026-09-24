import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9O5YuUqRcXVZgA_pWHKKugbilLi6geAI",
  authDomain: "organicswaad-b8965.firebaseapp.com",
  projectId: "organicswaad-b8965",
  storageBucket: "organicswaad-b8965.firebasestorage.app",
  messagingSenderId: "447250501208",
  appId: "1:447250501208:web:aea7ed3621d9af3437442d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
