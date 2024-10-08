import { setRedirectUserTo } from "../../features/auth/auth-slice";

const authMiddleware = (store) => (next) => (action) => {
  const isValidStatus = store.getState().auth.status === "succeeded";
  const isValidType = action.type === "auth/setUser";

  if (isValidType && isValidStatus) {
    const redirectTo = store.getState().auth.redirectUserTo;

    if (redirectTo) {
      window.location.href = redirectTo;
      store.dispatch(setRedirectUserTo(null));
    }
  }

  return next(action);
};

export default authMiddleware;
