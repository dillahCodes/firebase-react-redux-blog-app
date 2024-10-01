import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";

const useGetMostPopularTopics = () => {
  const [topicsData, setTopicsData] = useState([]);

  const getMostPopularTopics = useCallback(async () => {
    const articlesTopicsRef = collection(db, "topics-article");
    try {
      const popularTopicsQuery = query(articlesTopicsRef, orderBy("topic_count", "desc"), limit(10));
      const result = await getDocs(popularTopicsQuery);
      const data = result.docs.map((doc) => ({
        doc_id: doc.id,
        topic: doc.data().topic_name,
        count: doc.data().topic_count,
      }));
      setTopicsData(data);
    } catch (error) {
      console.error("Error fetching most popular topics: ", error);
    }
  }, []);

  useEffect(() => {
    getMostPopularTopics();
  }, [getMostPopularTopics]);

  return { topicsData };
};

export default useGetMostPopularTopics;
