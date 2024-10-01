import { signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase-services";

const firebaseAuthServices = {
  loginWithEmailPassWord: (email, password) => signInWithEmailAndPassword(auth, email, password),
  updateProfileImage: (data) => updateProfile(auth.currentUser, { photoURL: data }),
  logOut: () => signOut(auth),
};

export default firebaseAuthServices;
