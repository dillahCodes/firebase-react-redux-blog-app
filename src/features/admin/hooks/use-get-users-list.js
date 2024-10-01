import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserEditData, setUserEditData } from "../edit-user-slice";

const useAdminGetUsersList = () => {
  const dispatch = useDispatch();

  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });
  const [users, setUsers] = useState([]);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleGetUsers = async (userName) => {
    // validate
    const isUserNameValid = userName.length >= 3 && userName.trim() !== "";
    if (!isUserNameValid) {
      setUsers([]);
      setFetchStatus({ isLoading: false, isError: false });
      return;
    }

    // Fetch users based on user name
    const usersFirebaseRef = collection(db, "users-role");
    const usersDocumentRef = query(
      usersFirebaseRef,
      where("name", ">=", userName),
      where("name", "<=", userName + "\uf8ff"),
      orderBy("name", "asc"),
      limit(5)
    );

    // Fetch users
    try {
      setFetchStatus({ isLoading: true, isError: false });
      const querySnapShot = await getDocs(usersDocumentRef);
      if (querySnapShot.empty) {
        setUsers([]);
      } else {
        const users = querySnapShot.docs.map((doc) => ({
          doc_id: doc.id,
          ...doc.data(),
        }));
        setUsers(users);
      }
      setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      console.error("Error fetching users:", error);
      setFetchStatus({ isLoading: false, isError: true });
    }
  };

  const handleNavigateForEditUser = (userId, userName) => {
    setSearchParams({ id: userId, name: userName }, { replace: false });
    navigate(`/dashboard-admin/edit-pengguna?id=${userId}&name=${userName}`, { replace: true });
  };

  const handleGetUserWithUserId = async (userId) => {
    // validate
    if (!userId || userId.trim() === "") {
      dispatch(clearUserEditData());
      return {
        success: false,
        message: "id pengguna tidak valid",
      };
    }

    try {
      // fetch user data
      const userCollection = collection(db, "users-role");
      const querySearch = query(userCollection, where("user_id", "==", userId));
      const querySnapShot = await getDocs(querySearch);
      const querySnapShotData = querySnapShot.docs.map((doc) => ({
        doc_id: doc.id,
        ...doc.data(),
      }));

      // check if user exists
      if (querySnapShotData.length === 0) {
        dispatch(clearUserEditData());
        return {
          success: false,
          message: "user tidak ditemukan",
        };
      } else {
        const user = querySnapShotData[0];
        dispatch(setUserEditData(JSON.parse(JSON.stringify(user))));

        return {
          success: true,
        };
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return {
    handleGetUsers,
    users,
    fetchStatus,
    handleNavigateForEditUser,
    handleGetUserWithUserId,
  };
};

export default useAdminGetUsersList;
