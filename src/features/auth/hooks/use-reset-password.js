import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase-services";
import { sendPasswordResetEmail } from "firebase/auth";

const useResetPassword = () => {
  const handleResetPassword = async (email) => {
    // validate
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isEmailNotExist = email.trim() === "" || email.length < 3;
    if (isEmailNotExist || !isEmailValid) {
      return {
        success: false,
        message: "email tidak valid 🥹, silahkan coba lagi",
      };
    }

    // get email in use role database
    const userEmailRef = collection(db, "users-role");
    const userEmailQuery = query(userEmailRef, where("email", "==", email));

    try {
      const querySnapShot = await getDocs(userEmailQuery);
      //   validate if email not exist
      if (querySnapShot.empty) {
        return {
          success: false,
          message: "email tidak ditemukan 🥹, silahkan coba lagi",
        };
      } else {
        await sendPasswordResetEmail(auth, email);
        return {
          success: true,
          message: "email verifikasi telah dikirim, silahkan cek email mu 🤗",
        };
      }
    } catch (error) {
      console.error("error during send email verification: ", error);
      return {
        success: false,
        message: error.message,
      };
    }
  };

  return { handleResetPassword };
};

export default useResetPassword;
