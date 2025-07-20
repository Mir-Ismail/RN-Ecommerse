import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBushEXCqUx0VzbYkRy06qEMbNeGrGxWNc",
  authDomain: "ecommerce-app-f6fc5.firebaseapp.com",
  projectId: "ecommerce-app-f6fc5",
  storageBucket: "ecommerce-app-f6fc5.appspot.com",
  messagingSenderId: "56178408760",
  appId: "1:56178408760:web:80fbf25fe48fdb7eca15cd",
  measurementId: "G-F5B8YSSEQD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
export default app;
