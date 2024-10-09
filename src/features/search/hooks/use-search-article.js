import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import useUser from "../../auth/hooks/use-user";

const useSearchArticle = ({ searchKeyword }) => {
  const { user } = useUser();
  const [articleList, setArticleList] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const handleFetchArticle = useCallback(async () => {
    if (!searchKeyword || searchKeyword.trim().length <= 3 || !user) {
      setArticleList([]);
      setFetchStatus({ isLoading: false, isError: true });
      return;
    }

    try {
      setFetchStatus({ isLoading: true, isError: false });

      const articleDocRef = query(
        collection(db, "articles"),
        orderBy("title", "asc"), // orderBy must come before where
        where("title", ">=", searchKeyword),
        where("title", "<=", searchKeyword + "\uf8ff"),
        where("reviewStatus", "==", "approved"),
        limit(6)
      );

      const querySnapShot = await getDocs(articleDocRef);
      const articles = querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      setArticleList(articles);

      setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      setFetchStatus({ isLoading: false, isError: true });
      console.error("Error while fetching article:", error);
    }
  }, [searchKeyword, user]);

  useEffect(() => {
    if (searchKeyword) {
      handleFetchArticle();
    } else {
      setArticleList([]);
    }
  }, [handleFetchArticle, searchKeyword]);

  return { isError: fetchStatus.isError, isLoading: fetchStatus.isLoading, articleList };
};

export default useSearchArticle;
