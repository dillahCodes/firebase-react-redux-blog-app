import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/auth-slice";

import locationMiddleware from "./middleware/location-middleware";
import headerSlice from "./slices/header-slice";
import drawerSlice from "./slices/drawer-slice";
import profileSlice from "../features/profile/profile-slice";
import editUserSlice from "../features/admin/edit-user-slice";
import postDataSlice from "../features/post/post-data-slice";

import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import authMiddleware from "./middleware/auth-middleware";

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: true,
});

routerMiddleware;

const store = configureStore({
  reducer: {
    // auth slices
    auth: authSlice,

    // ui slices
    drawer: drawerSlice,
    header: headerSlice,
    profile: profileSlice,

    // router slices
    router: routerReducer,

    // post slices (add article page)
    postData: postDataSlice,

    // admin dashboard slices
    editUser: editUserSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types
        ignoredActions: ["postDataState/updateMainImageContent"],
        // Ignore these paths in the state
        ignoredPaths: ["postDataState.main_image_content", "postData.main_image_content"],
      },
    }).concat(routerMiddleware, locationMiddleware, authMiddleware),
});

export const history = createReduxHistory(store);
export default store;
