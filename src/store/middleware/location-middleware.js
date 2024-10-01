import { closeAllDrawer } from "../slices/drawer-slice";
import { clearSearchBarValue, hideSearchBarResult } from "../slices/header-slice";

const locationMiddleware = (storeAPI) => (next) => (action) => {
  if (action.type === "@@router/LOCATION_CHANGE") {
    storeAPI.dispatch(closeAllDrawer()); // in location change close all drawers

    storeAPI.dispatch(hideSearchBarResult()); // in location change hide search bar
    storeAPI.dispatch(clearSearchBarValue()); // in location change clear search bar value
  }
  return next(action);
};

export default locationMiddleware;
