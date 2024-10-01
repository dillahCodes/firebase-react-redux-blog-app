import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../../firebase/firebase-services";

const useVerifyUserEmail = () => {
  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      return true;
    } catch (error) {
      console.error("error during send email verification: ", error);
      return false;
    }
  };

  return { handleSendVerificationEmail };
};

export default useVerifyUserEmail;
