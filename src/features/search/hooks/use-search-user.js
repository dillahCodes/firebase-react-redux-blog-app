import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useCallback, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import useUser from "../../auth/hooks/use-user";

const useSearchUser = ({ searchKeyword }) => {
  const { user } = useUser();
  const [peopleList, setPeopleList] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const handleFetchUsers = useCallback(async () => {
    if (!searchKeyword || searchKeyword.trim().length <= 3 || !user) {
      setPeopleList([]);
      setFetchStatus({ isLoading: false, isError: true });
      return;
    }

    try {
      setFetchStatus({ isLoading: true, isError: false });

      const peopleListQuery = query(
        collection(db, "users-role"),
        where("name", ">=", searchKeyword),
        where("status", "==", "active"),
        where("name", "<=", searchKeyword + "\uf8ff"),
        orderBy("name", "asc"),
        limit(6)
      );

      const querySnapShot = await getDocs(peopleListQuery);
      const articleList = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      querySnapShot.empty ? setPeopleList([]) : setPeopleList(JSON.parse(JSON.stringify(articleList)));

      setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      setFetchStatus({ isLoading: false, isError: true });
      console.error("Error while fetching article:", error.message);
    }
  }, [searchKeyword, user]);

  useEffect(() => {
    if (searchKeyword) {
      handleFetchUsers();
    } else {
      setPeopleList([]);
    }
  }, [handleFetchUsers, searchKeyword]);

  return { isError: fetchStatus.isError, isLoading: fetchStatus.isLoading, peopleList };
};

export default useSearchUser;
