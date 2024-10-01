import { reload, updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase-services";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";

const useChangeUsername = () => {
  const handleChangeUsername = async (newName) => {
    try {
      // Change user name in firebase auth
      await reload(auth.currentUser);
      await updateProfile(auth.currentUser, {
        displayName: newName,
      });

      // change user name in firestore
      const userRef = collection(db, "users-role");
      const userDocRef = query(userRef, where("user_id", "==", auth.currentUser.uid));
      const querySnapShot = await getDocs(userDocRef);
      const userDoc = querySnapShot.docs[0];
      await updateDoc(userDoc.ref, {
        name: newName,
      });

      return {
        success: true,
        message: "User name berhasil diubah.",
      };
    } catch (error) {
      console.error("Error changing user name:", error);
      return {
        success: false,
        message: "Gagal mengubah user name, silahkan coba lagi.",
      };
    }
  };

  return { handleChangeUsername };
};

export default useChangeUsername;
