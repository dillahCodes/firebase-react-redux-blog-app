import { auth } from "../../../firebase/firebase-services";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUserRole as handleSetUserRole } from "../set-user-role";
import { useState } from "react";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUserRegister = async (email, password, displayName, confirmPassword, setErrorMessage) => {
    try {
      setIsLoading(true);
      const validateResult = validateRegister(email, password, displayName, confirmPassword);
      if (validateResult) {
        setIsLoading(false);
        setErrorMessage(validateResult);
        return false;
      }

      // create user and update profile (username)
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });

      // create user role
      await handleSetUserRole(result.user.uid, result.user.email, result.user.displayName, result.user.photoURL);

      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      let errorMessage = "";
      let translateErrorMessage = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "The email address is already in use by another account.";
          translateErrorMessage = "alamat email telah digunakan diakun lain";
          break;
        case "auth/invalid-email":
          errorMessage = "The email address is not valid.";
          translateErrorMessage = "alamat email tidak valid";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Operation not allowed. Please enable email/password authentication in the Firebase console.";
          translateErrorMessage = "registrasi gagal, silahkan hubungi bantuan";
          break;
        case "auth/weak-password":
          errorMessage = "The password is too weak.";
          translateErrorMessage = "password terlalu lemah";
          break;
        default:
          errorMessage = "An unknown error occurred.";
          translateErrorMessage = "terjadi kesalahan, silahkan coba lagi";
      }

      setErrorMessage(translateErrorMessage);
      console.error("Error during register:", errorMessage !== "" ? errorMessage : error);
    }
  };

  return {
    handleUserRegister,
    isLoading,
  };
};

export default useRegister;

const validateRegister = (email, password, displayName, confirmPassword) => {
  const isEmptyEmail = !email || !email.includes("@");
  const isEmptyPassword = !password || password.trim() === "";
  const isEmptyDisplayName = !displayName || displayName.trim() === "";
  const isPasswordMatch = password === confirmPassword;

  if (isEmptyEmail || isEmptyPassword || isEmptyDisplayName) return "email/password/displayName tidak valid";
  else if (!isPasswordMatch) return "password dan konfirmasi password tidak cocok";

  return "";
};
