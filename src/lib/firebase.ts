import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const fireBaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(fireBaseConfig);
export const db = getFirestore(app);