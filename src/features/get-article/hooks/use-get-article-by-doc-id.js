import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";

const useGetArticleByDocId = ({ articleDocId }) => {
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });
  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    if (!articleDocId) {
      setFetchStatus({ isLoading: false, isError: true });
      return;
    }

    // Set loading state
    setFetchStatus({ isLoading: true, isError: false });

    // Reference to the article document
    const articleDocRef = doc(db, "articles", articleDocId);

    // Listen to real-time updates using onSnapshot
    const unsubscribe = onSnapshot(
      articleDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setArticleData(JSON.parse(JSON.stringify(docSnap.data())));
          setFetchStatus({ isLoading: false, isError: false });
        } else {
          console.error("No such document!");
          setFetchStatus({ isLoading: false, isError: true });
        }
      },
      (error) => {
        console.error("Error getting document:", error.message);
        setFetchStatus({ isLoading: false, isError: true });
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, [articleDocId]);

  return { isError: fetchStatus.isError, isLoading: fetchStatus.isLoading, articleData };
};

export default useGetArticleByDocId;
