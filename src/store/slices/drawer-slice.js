import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDrawerMenuOpen: false,
  isDrawerNotificationOpen: false,
  drawerTitle: "",
};

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    openDrawerMenu: (state) => {
      state.isDrawerMenuOpen = true;
      state.isDrawerNotificationOpen = false;
      state.drawerTitle = "Menu Utama";
    },
    closeDrawerMenu: (state) => {
      state.isDrawerMenuOpen = false;
      state.drawerTitle = "";
    },
    toggleDrawerMenu: (state) => {
      state.isDrawerMenuOpen = !state.isDrawerMenuOpen;
      state.isDrawerMenuOpen ? (state.drawerTitle = "Menu Utama") : (state.drawerTitle = "");
    },
    openDrawerNotification: (state) => {
      state.isDrawerNotificationOpen = true;
      state.isDrawerMenuOpen = false;
      state.drawerTitle = "Notifikasi";
    },
    closeDrawerNotification: (state) => {
      state.isDrawerNotificationOpen = false;
      state.drawerTitle = "";
    },
    toggleDrawerNotification: (state) => {
      state.isDrawerNotificationOpen = !state.isDrawerNotificationOpen;
      state.isDrawerNotificationOpen ? (state.drawerTitle = "Notifikasi") : (state.drawerTitle = "");
    },
    closeAllDrawer: (state) => {
      state.isDrawerMenuOpen = false;
      state.isDrawerNotificationOpen = false;
      state.drawerTitle = "";
    },
    setDrawerTitle: (state, action) => {
      state.drawerTitle = action.payload;
    },
  },
});

export const {
  openDrawerMenu,
  closeDrawerMenu,
  toggleDrawerMenu,
  openDrawerNotification,
  closeDrawerNotification,
  toggleDrawerNotification,
  closeAllDrawer,
  setDrawerTitle,
} = drawerSlice.actions;

export default drawerSlice.reducer;
