import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import admin, { ServiceAccount } from "firebase-admin"
import serviceAccount from "../../auth.google.json" assert { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

const fireBaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(fireBaseConfig);
const auth = getAuth(app)
signInWithEmailAndPassword(auth, "jobsanamotta@gmail.com", "pauloHenrique*31")
.then((userCredential) => {
    console.log("Usuário autenticado:", userCredential.user);
  })
  .catch((error) => {
    console.error("Erro de login:", error.code, error.message);
  });
export const db = getFirestore(app);
