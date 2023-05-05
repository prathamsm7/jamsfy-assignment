import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is option al

export const firebaseConfig = {
  apiKey: 'AIzaSyAScyTnFyHG3TbQQaPgd4k8wiUwTTAcaBU',
  authDomain: 'jamsfy-e1ef4.firebaseapp.com',
  projectId: 'jamsfy-e1ef4',
  storageBucket: 'jamsfy-e1ef4.appspot.com',
  messagingSenderId: '376384490433',
  appId: '1:376384490433:web:27a73dbecd58f3f749fd40',
  measurementId: 'G-4ZK922B428',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }

    return user;
  } catch (err) {
    console.error('err', err);
    // alert(err.message);
    return err;
  }
};

export { signInWithGoogle, auth, db };
