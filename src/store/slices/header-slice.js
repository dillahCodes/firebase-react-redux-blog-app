import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHeaderShown: true,
  isSearchBarResultShown: false,
  searchBarValue: "",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    showHeader: (state) => {
      state.isHeaderShown = true;
    },
    hideHeader: (state) => {
      state.isHeaderShown = false;
    },
    toggleHeader: (state) => {
      state.isHeaderShown = !state.isHeaderShown;
    },

    showSearchBarResult: (state) => {
      state.isSearchBarResultShown = true;
    },
    hideSearchBarResult: (state) => {
      state.isSearchBarResultShown = false;
    },
    toggleSearchBarResult: (state) => {
      state.isSearchBarResultShown = !state.isSearchBarResultShown;
    },

    setSearchBarValue: (state, action) => {
      state.searchBarValue = action.payload;
    },
    clearSearchBarValue: (state) => {
      state.searchBarValue = "";
    },
    resetAllSearchBarState: (state) => {
      state.isSearchBarResultShown = false;
      state.searchBarValue = "";
    },
  },
});

export const { showHeader, hideHeader, toggleHeader } = headerSlice.actions;
export const {
  showSearchBarResult,
  hideSearchBarResult,
  toggleSearchBarResult,
  setSearchBarValue,
  clearSearchBarValue,
  resetAllSearchBarState,
} = headerSlice.actions;
export default headerSlice.reducer;
