import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase-services";
import { v4 as uuidv4 } from "uuid";

export const setUserRole = async (userId, userEmail, userName, photoURL) => {
  const firebaseCollectionRef = collection(db, "users-role");

  try {
    const timestamp = serverTimestamp();
    await addDoc(firebaseCollectionRef, {
      id: uuidv4(),
      user_id: userId,
      email: userEmail,
      name: userName,
      photoUrl: photoURL,
      role: "user",
      status: "active", // active or banned
      banned_reason: "",
      role_created_at: timestamp,
      role_update_at: timestamp,
      followers: 0,
      following: 0,
      articles: 0,
    });
  } catch (error) {
    console.error("error set user role:", error);
  }
};
