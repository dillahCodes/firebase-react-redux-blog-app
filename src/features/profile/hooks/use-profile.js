import { useDispatch, useSelector } from "react-redux";
import {
  clearConfirmPasswordError,
  clearCurrentPasswordError,
  clearNewPasswordError,
  setConfirmPasswordError,
  setCurrentPasswordError,
  setNewPasswordError,
} from "../profile-slice";
import { useEffect } from "react";

const useProfile = (passwordData) => {
  const dispatch = useDispatch();
  const { currentPassword, newPassword, confirmPassword } = passwordData;

  //     state
  const currentPasswordErrorMessage = useSelector((state) => state.profile.currentPasswordErrorMessage);
  const isCurrentPasswordError = useSelector((state) => state.profile.isCurrentPasswordError);

  const newPasswordErrorMessage = useSelector((state) => state.profile.newPasswordErrorMessage);
  const isNewPasswordError = useSelector((state) => state.profile.isNewPasswordError);

  const confirmPasswordErrorMessage = useSelector((state) => state.profile.confirmPasswordErrorMessage);
  const isConfirmPasswordError = useSelector((state) => state.profile.isConfirmPasswordError);

  //     dispatch
  const setCurrentPasswordErrorState = (message) => dispatch(setCurrentPasswordError(message));
  const clearCurrentPasswordErrorState = () => dispatch(clearCurrentPasswordError());

  const setNewPasswordErrorState = (message) => dispatch(setNewPasswordError(message));
  const clearNewPasswordErrorState = () => dispatch(clearNewPasswordError());

  const setConfirmPasswordErrorState = (message) => dispatch(setConfirmPasswordError(message));
  const clearConfirmPasswordErrorState = () => dispatch(clearConfirmPasswordError());

  // Validation logic in component did update
  useEffect(() => {
    const handleValidateInComponentDidUpdate = () => {
      const isCurrentPasswordEmpty = currentPassword.trim() === "" && currentPassword.length > 0;
      const isNewPasswordEmpty = newPassword.trim() === "" && newPassword.length > 0;
      const isConfirmPasswordEmpty = confirmPassword.trim() === "" && confirmPassword.length > 0;

      const isConfirmPasswordNotMatch = confirmPassword !== newPassword;
      const isCurrentPasswordSameAsNewPassword =
        currentPassword === newPassword && currentPassword.trim() !== "" && newPassword.trim() !== "";

      // Clear all previous errors before applying new ones
      dispatch(clearCurrentPasswordError());
      dispatch(clearNewPasswordError());
      dispatch(clearConfirmPasswordError());

      if (isCurrentPasswordEmpty) {
        dispatch(setCurrentPasswordError("Password saat ini harus diisi."));
      }

      if (isNewPasswordEmpty) {
        dispatch(setNewPasswordError("Password baru harus diisi."));
      }

      if (isConfirmPasswordEmpty) {
        dispatch(setConfirmPasswordError("Konfirmasi password harus diisi."));
      }

      if (isConfirmPasswordNotMatch) {
        dispatch(setNewPasswordError("Konfirmasi password tidak sama."));
        dispatch(setConfirmPasswordError("Konfirmasi password tidak sama."));
      }

      if (isCurrentPasswordSameAsNewPassword) {
        dispatch(setCurrentPasswordError("Password baru tidak boleh sama."));
        dispatch(setNewPasswordError("Password baru tidak boleh sama."));
      }
    };

    handleValidateInComponentDidUpdate();
  }, [currentPassword, confirmPassword, newPassword, dispatch]);

  return {
    currentPasswordErrorMessage,
    isCurrentPasswordError,
    newPasswordErrorMessage,
    isNewPasswordError,
    confirmPasswordErrorMessage,
    isConfirmPasswordError,

    setCurrentPasswordErrorState,
    clearCurrentPasswordErrorState,

    setNewPasswordErrorState,
    clearNewPasswordErrorState,

    setConfirmPasswordErrorState,
    clearConfirmPasswordErrorState,
  };
};

export default useProfile;
