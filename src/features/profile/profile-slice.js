import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPasswordErrorMessage: "",
  isCurrentPasswordError: false,

  newPasswordErrorMessage: "",
  isNewPasswordError: false,

  confirmPasswordErrorMessage: "",
  isConfirmPasswordError: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,

  reducers: {
    setCurrentPasswordError: (state, action) => {
      state.currentPasswordErrorMessage = action.payload;
      state.isCurrentPasswordError = true;
    },

    clearCurrentPasswordError: (state) => {
      state.currentPasswordErrorMessage = "";
      state.isCurrentPasswordError = false;
    },

    setNewPasswordError: (state, action) => {
      state.newPasswordErrorMessage = action.payload;
      state.isNewPasswordError = true;
    },

    clearNewPasswordError: (state) => {
      state.newPasswordErrorMessage = "";
      state.isNewPasswordError = false;
    },

    setConfirmPasswordError: (state, action) => {
      state.confirmPasswordErrorMessage = action.payload;
      state.isConfirmPasswordError = true;
    },

    clearConfirmPasswordError: (state) => {
      state.confirmPasswordErrorMessage = "";
      state.isConfirmPasswordError = false;
    },

    clearErrors: (state) => {
      state.currentPasswordErrorMessage = "";
      state.isCurrentPasswordError = false;

      state.newPasswordErrorMessage = "";
      state.isNewPasswordError = false;

      state.confirmPasswordErrorMessage = "";
      state.isConfirmPasswordError = false;
    },
  },
});

export default profileSlice.reducer;
export const {
  setCurrentPasswordError,
  clearCurrentPasswordError,

  setNewPasswordError,
  clearNewPasswordError,

  setConfirmPasswordError,
  clearConfirmPasswordError,

  clearErrors,
} = profileSlice.actions;
