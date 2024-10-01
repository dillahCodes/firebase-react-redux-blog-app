import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase-services";
import { useEffect, useState } from "react";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";

const useChangeEmail = (newEmail, currPassword) => {
  const [errors, setErrors] = useState({
    isInputNewEmailError: false,
    newEmailErrorMessage: "",

    isInputCurrPasswordError: false,
    currPasswordErrorMessage: "",

    resultMessage: "",
  });

  //   validate input in componentDidUpdate
  useEffect(() => {
    const validateInput = () => {
      // Define the new errors state
      const newErrors = { ...errors };

      //   validate variable
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isCurrPasswordEmptyAndEmailNotEmpty = currPassword.trim() === "" && newEmail.length > 0;
      const isEmailNotValid = newEmail.trim() !== "" && !newEmail.match(emailRegex);

      // Validate new email
      if (isEmailNotValid) {
        newErrors.isInputNewEmailError = true;
        newErrors.newEmailErrorMessage = "email tidak valid";
      }

      if (isEmailNotValid && isCurrPasswordEmptyAndEmailNotEmpty) {
        newErrors.isInputNewEmailError = true;
        newErrors.newEmailErrorMessage = "email tidak valid";
      } else {
        newErrors.isInputNewEmailError = false;
        newErrors.newEmailErrorMessage = "";
      }

      // Validate current password
      if (isCurrPasswordEmptyAndEmailNotEmpty) {
        newErrors.isInputCurrPasswordError = true;
        newErrors.currPasswordErrorMessage = "password harus diisi";
      } else {
        newErrors.isInputCurrPasswordError = false;
        newErrors.currPasswordErrorMessage = "";
      }

      // Update the errors state
      setErrors(newErrors);
    };

    validateInput();

    // eslint-disable-next-line
  }, [newEmail, currPassword]);

  const handleValidateInput = () => {
    // validate form in button click
    const newErrors = { ...errors };

    // validate variable
    const isEmailEmpty = newEmail.trim() === "";
    const isCurrPasswordEmpty = currPassword.trim() === "";

    // validate new email
    if (isEmailEmpty) {
      newErrors.isInputNewEmailError = true;
      newErrors.newEmailErrorMessage = "email harus diisi";
    } else {
      newErrors.isInputNewEmailError = false;
      newErrors.newEmailErrorMessage = "";
    }

    // validate current password
    if (isCurrPasswordEmpty) {
      newErrors.isInputCurrPasswordError = true;
      newErrors.currPasswordErrorMessage = "password harus diisi";
    } else {
      newErrors.isInputCurrPasswordError = false;
      newErrors.currPasswordErrorMessage = "";
    }

    // set errors state
    setErrors(newErrors);

    return newErrors;
  };

  const handleChangeEmail = async () => {
    const userCredential = EmailAuthProvider.credential(auth.currentUser.email, currPassword);

    try {
      await reauthenticateWithCredential(auth.currentUser, userCredential);
      await updateEmail(auth.currentUser, newEmail);

      // change user email in firestore
      const userRef = collection(db, "users-role");
      const userDocRef = query(userRef, where("user_id", "==", auth.currentUser.uid));
      const querySnapShot = await getDocs(userDocRef);
      const userDoc = querySnapShot.docs[0];
      await updateDoc(userDoc.ref, {
        email: newEmail,
      });

      //     set success message
      setErrors((prevValue) => ({
        ...prevValue,
        resultMessage: `Silakan periksa kotak masuk "${newEmail}" untuk konfirmasi email.`,
      }));
    } catch (error) {
      console.error("error during update user email: ", error.code);

      if (error.code === "auth/wrong-password") {
        setErrors((prevValue) => ({
          ...prevValue,
          isInputCurrPasswordError: true,
          currPasswordErrorMessage: "password salah",
        }));

        setTimeout(() => {
          setErrors((prevValue) => ({
            ...prevValue,
            isInputCurrPasswordError: false,
            currPasswordErrorMessage: "",
          }));
        }, 3000);
      }
    }
  };

  return {
    handleChangeEmail,
    errors,
    handleValidateInput,
  };
};

export default useChangeEmail;
