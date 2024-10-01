import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";

const useUpdateUserRole = () => {
  const handleUpdateUserRole = async (docId, role) => {
    try {
      const docUserRef = doc(db, "users-role", docId);
      await updateDoc(docUserRef, { role: role, role_update_at: serverTimestamp() });

      return {
        success: true,
        message: "user telah berhasil diperbarui",
      };
    } catch (error) {
      console.error("Error updating user role:", error);
      return {
        success: false,
        message: "error ketika mengupdate user role, silahkan coba lagi",
      };
    }
  };

  return {
    handleUpdateUserRole,
  };
};

export default useUpdateUserRole;
