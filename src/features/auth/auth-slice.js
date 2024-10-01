import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // idle, loading, succeeded, failed
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
    },
    setUserRole: (state, action) => {
      state.user = { ...state.user, other_data: action.payload };
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { setUser, clearUser, setStatus, setUserRole } = authSlice.actions;
