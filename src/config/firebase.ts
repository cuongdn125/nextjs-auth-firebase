import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3p_9BCi_VGUMXNvs5gp4U4V3cVUg24ZI",
  authDomain: "nextjs-auth-demo-d462e.firebaseapp.com",
  projectId: "nextjs-auth-demo-d462e",
  storageBucket: "nextjs-auth-demo-d462e.appspot.com",
  messagingSenderId: "541140722719",
  appId: "1:541140722719:web:c95fed1de06425f55b612a",
  measurementId: "G-7EVEPTDBN8",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore(app);

export default firebaseConfig;
