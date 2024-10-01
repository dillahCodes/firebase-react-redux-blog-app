import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase-services";

const useChangePassword = () => {
  const handleChangeUserPassword = async (currPassword, newPassword) => {
    const credential = EmailAuthProvider.credential(auth.currentUser.email, currPassword);

    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating user password:", error);

      const errorMessage = error.message || "An unknown error occurred.";
      const errorCode = error.code || "unknown_error";

      // Return the error message and code
      return {
        success: false,
        error: {
          message: errorMessage,
          code: errorCode,
        },
      };
    }
  };

  return { handleChangeUserPassword };
};

export default useChangePassword;
