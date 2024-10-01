import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase/firebase-services";

const useGetArticleByTopic = ({ topicName, fetchLimit }) => {
  //   const { user } = useUser();
  const [articleData, setArticleData] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const isValidTopicName = useMemo(() => {
    return typeof topicName === "string" && topicName.trim().toLocaleLowerCase().length > 0;
  }, [topicName]);

  const isValidLimit = useMemo(() => {
    return typeof fetchLimit === "number" && fetchLimit >= 1 && fetchLimit <= 5;
  }, [fetchLimit]);

  const handleFetchArticle = useCallback(async () => {
    if (!isValidTopicName || !isValidLimit) return;

    try {
      setFetchStatus({ isLoading: true, isError: false });

      const articleDocRef = collection(db, "articles");
      const articleQuery = query(
        articleDocRef,
        where("topicNames", "array-contains", topicName),
        where("reviewStatus", "==", "approved"),
        orderBy("createdAt", "asc"),
        limit(fetchLimit)
      );

      const querySnapShot = await getDocs(articleQuery);

      const article = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      setArticleData(article);

      querySnapShot.empty
        ? setFetchStatus({ isLoading: false, isError: true })
        : setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      console.error("error while fetch article by topic: ", error.message);
    }
  }, [isValidLimit, isValidTopicName, fetchLimit, topicName]);

  useEffect(() => {
    isValidLimit && isValidTopicName && handleFetchArticle();
  }, [isValidLimit, isValidTopicName, handleFetchArticle]);

  return { articleData, isError: fetchStatus.isError, isLoading: fetchStatus.isLoading };
};

export default useGetArticleByTopic;
