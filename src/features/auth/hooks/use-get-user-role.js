import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";

const useGetUserPhotoUrl = () => {
  const handleGetUserPhotoUrl = async (userId) => {
    try {
      const queryData = query(collection(db, "users-role"), where("user_id", "==", userId));
      const querySnapshot = await getDocs(queryData);
      const photoUrl = querySnapshot.docs[0].data().photoUrl;

      if (querySnapshot.size > 0)
        return {
          success: true,
          photoUrl,
        };
    } catch (error) {
      console.error("Error while getting user role:", error.message);
    }
  };

  return { handleGetUserPhotoUrl };
};

export default useGetUserPhotoUrl;
