import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase/firebase-services";

const useGetTopics = ({ fetchLimit }) => {
  const [topics, setTopics] = useState([]);
  const [fetchStatus, setFetchStatus] = useState({
    isError: false,
    isLoading: false,
  });

  const isValidFetchLimit = useMemo(() => {
    return typeof fetchLimit === "number" && fetchLimit > 0;
  }, [fetchLimit]);

  const handleFetchTopics = useCallback(async () => {
    if (!isValidFetchLimit) return;

    setFetchStatus({ isLoading: true, isError: false });
    try {
      const topicsDocRef = collection(db, "topics-article");
      const topicQuery = query(topicsDocRef, orderBy("topic_name", "asc"), limit(fetchLimit));
      const querySnapShot = await getDocs(topicQuery);

      const topicList = querySnapShot.empty ? [] : querySnapShot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
      querySnapShot.empty ? setTopics([]) : setTopics(JSON.parse(JSON.stringify(topicList)));

      setFetchStatus({ isLoading: false, isError: false });
    } catch (error) {
      console.error("error while fetch topics: ", error.message);
      setFetchStatus({ isLoading: false, isError: true });
    }
  }, [fetchLimit, isValidFetchLimit]);

  useEffect(() => {
    isValidFetchLimit && handleFetchTopics();
  }, [handleFetchTopics, isValidFetchLimit]);

  return { isLoading: fetchStatus.isLoading, isError: fetchStatus.isError, topics };
};

export default useGetTopics;
