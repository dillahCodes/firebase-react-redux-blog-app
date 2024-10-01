import { createSlice } from "@reduxjs/toolkit";

const editUserSlice = createSlice({
  name: "editUser",
  initialState: {
    userData: null,
  },

  reducers: {
    setUserEditData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserEditData: (state) => {
      state.userData = null;
    },
  },
});
export const { setUserEditData, clearUserEditData } = editUserSlice.actions;
export default editUserSlice.reducer;
