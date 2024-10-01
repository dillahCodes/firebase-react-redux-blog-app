import { collection, limit, query, where, onSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase/firebase-services";

const useGetTopicByName = ({ topicName }) => {
  const [topicData, setTopicData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  const isValidTopicName = useMemo(() => {
    return typeof topicName === "string" && topicName.trim().length > 0;
  }, [topicName]);

  const handleFetchTopic = useCallback(() => {
    if (!isValidTopicName) return;

    setFetchStatus({ isLoading: true, isError: false });

    const topicDocRef = collection(db, "topics-article");
    const topicQuery = query(topicDocRef, where("topic_name", "==", topicName.trim().toLowerCase()), limit(1));

    // Realtime listener menggunakan onSnapshot
    const unsubscribe = onSnapshot(
      topicQuery,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const topic = { doc_id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
          setTopicData(topic);
          setFetchStatus({ isLoading: false, isError: false });
        } else {
          setTopicData(null);
          setFetchStatus({ isLoading: false, isError: true });
        }
      },
      (error) => {
        console.error("error while fetching topic by name: ", error.message);
        setFetchStatus({ isLoading: false, isError: true });
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [topicName, isValidTopicName]);

  useEffect(() => {
    const unsubscribe = handleFetchTopic();
    return () => unsubscribe && unsubscribe();
  }, [handleFetchTopic]);

  return { topicData, isLoading: fetchStatus.isLoading, isError: fetchStatus.isError };
};

export default useGetTopicByName;
