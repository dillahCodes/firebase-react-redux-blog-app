import { useState } from "react";
import firebaseAuthServices from "../firebase-auth-services";
const useLogIn = () => {
  const [isLaoding, setIsLoading] = useState(false);

  const handleUserLogIn = async (email, password, setErrorMessage) => {
    try {
      setIsLoading(true);
      const validateResult = validateLogin(email, password);
      if (validateResult) {
        setIsLoading(false);
        return setErrorMessage(validateResult);
      }

      await firebaseAuthServices.loginWithEmailPassWord(email, password);

      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);

      // Documentation Error list: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
      let errorMessage = "";
      let translateErrorMessage = "";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "The email address or password is not valid.";
          translateErrorMessage = "email/password tidak valid";
          break;
        case "auth/wrong-password":
          errorMessage = "The email address or password is not valid.";
          translateErrorMessage = "email/password tidak valid";
          break;
        default:
          errorMessage = "An unknown error occurred.";
          translateErrorMessage = "terjadi kesalahan coba lagi";
      }

      setErrorMessage(translateErrorMessage || "");
      console.error("error during login: ", errorMessage);
      return false;
    }
  };

  return {
    handleUserLogIn,
    isLaoding,
  };
};

export default useLogIn;

const validateLogin = (email, password) => {
  const isEmptyEmail = !email || !email.includes("@");
  const isEmptyPassword = !password || password.trim() === "";

  if (isEmptyEmail || isEmptyPassword) return "email/password tidak valid";

  return "";
};
