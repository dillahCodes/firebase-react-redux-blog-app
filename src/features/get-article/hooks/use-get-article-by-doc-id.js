import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import { useNavigate } from "react-router-dom";

const useGetArticleByDocId = ({ articleDocId }) => {
  const navigate = useNavigate();
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
          const article = docSnap.data();

          // Check if the article's reviewStatus is "approved"
          if (article.reviewStatus === "approved") {
            setArticleData(JSON.parse(JSON.stringify(article)));
            setFetchStatus({ isLoading: false, isError: false });
          } else {
            // If the article is not approved, treat it as an error or ignore
            navigate(-1);
            console.error("Article is not approved!");
            setFetchStatus({ isLoading: false, isError: true });
          }
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
