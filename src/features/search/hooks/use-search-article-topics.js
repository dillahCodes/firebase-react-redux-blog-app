import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import useUser from "../../auth/hooks/use-user";

const useSearchArticleTopics = ({ searchKeyword }) => {
  const { user } = useUser();
  const [articleTopics, setArticleTopics] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const handleFetchUsers = useCallback(async () => {
    if (!searchKeyword || searchKeyword.trim().length <= 3 || !user) {
      setArticleTopics([]);
      setFetchStatus({ isLoading: false, isError: true });
      return;
    }

    try {
      setFetchStatus({ isLoading: true, isError: false });

      const peopleListQuery = query(
        collection(db, "topics-article"),
        where("topic_name", ">=", searchKeyword),
        where("topic_name", "<=", searchKeyword + "\uf8ff"),
        orderBy("topic_name", "asc"),
        limit(6)
      );

      const querySnapShot = await getDocs(peopleListQuery);
      const articleList = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      querySnapShot.empty ? setArticleTopics([]) : setArticleTopics(JSON.parse(JSON.stringify(articleList)));

      setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      setFetchStatus({ isLoading: false, isError: true });
      console.error("Error while fetching article:", error);
    }
  }, [searchKeyword, user]);

  useEffect(() => {
    searchKeyword ? handleFetchUsers() : setArticleTopics([]);
  }, [handleFetchUsers, searchKeyword]);

  return { isError: fetchStatus.isError, isLoading: fetchStatus.isLoading, articleTopics };
};

export default useSearchArticleTopics;
