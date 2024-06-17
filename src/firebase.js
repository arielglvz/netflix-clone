// ----- Libraries
import { toast } from "react-toastify";

// ---- Firebase Auth
import { initializeApp } from "firebase/app";
import { 
      createUserWithEmailAndPassword, 
      getAuth,  
      signInWithEmailAndPassword, 
      signOut } from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCczlLFHu1pwPYpFLxJnhEKGQdwnPN91W0",
  authDomain: "netflix-clone-ad7cc.firebaseapp.com",
  projectId: "netflix-clone-ad7cc",
  storageBucket: "netflix-clone-ad7cc.appspot.com",
  messagingSenderId: "608600021298",
  appId: "1:608600021298:web:7d45a2bffbb0dc9b455f2b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email
    })
  } catch (error) {
      console.log(error)
      toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const logout = () => {
  signOut(auth)
}

export { 
  auth, 
  db, 
  login, 
  signup, 
  logout 
}