import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase/firebase-services";

const useGetUserList = ({ limitFetchUserList }) => {
  const [userList, setUserList] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const isValidLimit = useMemo(() => {
    return typeof limitFetchUserList === "number" && limitFetchUserList > 0;
  }, [limitFetchUserList]);

  const handleFetchUsersList = useCallback(async () => {
    try {
      setFetchStatus({ isLoading: true, isError: false });

      const usersDocRef = collection(db, "users-role");
      const usersQuery = query(usersDocRef, where("status", "==", "active"), orderBy("name", "asc"), limit(limitFetchUserList));
      const querySnapShot = await getDocs(usersQuery);

      const userList = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      querySnapShot.empty ? setUserList([]) : setUserList(JSON.parse(JSON.stringify(userList)));

      setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      console.error("error while fetching user list:", error.message);
      setFetchStatus({ isLoading: false, isError: true });
    }
  }, [limitFetchUserList]);

  useEffect(() => {
    isValidLimit && handleFetchUsersList();
  }, [isValidLimit, handleFetchUsersList]);

  return { userList, isLoading: fetchStatus.isLoading, isError: fetchStatus.isError };
};

export default useGetUserList;
