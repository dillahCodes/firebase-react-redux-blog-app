import { onAuthStateChanged } from "firebase/auth";
import { setStatus, setUser, setUserRole } from "./auth-slice";
import { auth, db } from "../../firebase/firebase-services";
import { collection, getDocs, limit, query, updateDoc, where } from "firebase/firestore";

// listen to auth state change
const listenToAuthStateChange = (dispatch) => {
  dispatch(setStatus("loading"));

  onAuthStateChanged(auth, async (currentUser) => {
    currentUser ? handleUserStateChange(dispatch, currentUser) : handleUserLogout(dispatch);
  });
};

// handle user state change
const handleUserStateChange = (dispatch, currentUser) => {
  setTimeout(() => {
    if (currentUser.displayName) {
      const userData = setUserData(currentUser);
      dispatch(setUser(userData));
      dispatch(getUserRole(currentUser.uid, currentUser.email, currentUser.emailVerified));
      dispatch(setStatus("succeeded"));
    } else {
      dispatch(setStatus("failed"));
    }
  }, 500);
};

const handleUserLogout = (dispatch) => {
  dispatch(setStatus("failed"));
  dispatch(setUser(null));
};

const setUserData = (currentUser) => {
  return {
    accessToken: currentUser.accessToken,
    email: currentUser.email,
    displayName: currentUser.displayName,
    photoURL: currentUser.photoURL,
    uid: currentUser.uid,
    isAnonymous: currentUser.isAnonymous,
    metadata: JSON.parse(JSON.stringify(currentUser.metadata)),
    stsTokenManager: JSON.parse(JSON.stringify(currentUser.stsTokenManager)),
    emailVerified: currentUser.emailVerified,
    phoneNumber: currentUser.phoneNumber,
    providerData: currentUser.providerData,
    refreshToken: currentUser.refreshToken,
    tenantId: currentUser.tenantId,
  };
};

const getUserRole = (userId, userEmail, isEmailVerified) => {
  return async (dispatch) => {
    try {
      const documentUserRoleRef = collection(db, "users-role");
      const queryUserRole = query(documentUserRoleRef, where("user_id", "==", userId), limit(1));
      const querySnapshot = await getDocs(queryUserRole);
      const doc = querySnapshot.docs[0];

      // if user email in role data is not equal to current user email then set the email to role data
      const isUserEmailNotEqual = doc && doc.data().email !== userEmail && isEmailVerified;
      if (isUserEmailNotEqual) updateDoc(doc.ref, { email: userEmail });

      if (doc) {
        // get user role filter data
        const data = {
          email: doc.data().email,
          name: doc.data().name,
          role: doc.data().role,
          status: doc.data().status,
          banned_reason: doc.data().banned_reason,
          role_created_at: doc.data().role_created_at,
          role_update_at: doc.data().role_update_at,
        };

        // set user role to store
        dispatch(setUserRole(JSON.parse(JSON.stringify(data))));
      }
    } catch (error) {
      console.error("Error getting user role:", error);
    }
  };
};

export default listenToAuthStateChange;
