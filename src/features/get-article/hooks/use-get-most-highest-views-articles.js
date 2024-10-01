import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase/firebase-services";

const useGetMostHighestViewsArticles = ({ limitFetch }) => {
  const [articleData, setArticleData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const isValidFetchLimit = useMemo(() => {
    return typeof limitFetch === "number" && limitFetch > 0;
  }, [limitFetch]);

  const handleFetchArticle = useCallback(async () => {
    if (!isValidFetchLimit) return;

    try {
      setFetchStatus({ isLoading: true, isError: false });

      const articleDocRef = query(
        collection(db, "articles"),
        where("reviewStatus", "==", "approved"),
        orderBy("article_view", "desc"),
        limit(limitFetch)
      );
      const querySnapShot = await getDocs(articleDocRef);

      const articleList = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      querySnapShot.empty ? setArticleData([]) : setArticleData(JSON.parse(JSON.stringify(articleList)));

      setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      console.error("error while fetch most highest views articles: ", error.message);
    }
  }, [isValidFetchLimit, limitFetch]);

  useEffect(() => {
    isValidFetchLimit && handleFetchArticle();
  }, [handleFetchArticle, isValidFetchLimit]);

  return { articleData, isLoading: fetchStatus.isLoading, isError: fetchStatus.isError };
};

export default useGetMostHighestViewsArticles;
