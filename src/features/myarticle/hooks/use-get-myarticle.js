import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import useUser from "../../auth/hooks/use-user";
import { useMyArticlesPage } from "../../../components/pages/my-articles-page-components/context/my-articles-page-context";

const useGetMyArticle = () => {
  const { user } = useUser();
  const { dispatch } = useMyArticlesPage();
  const [articleData, setArticleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetMyArticle = useCallback(() => {
    setIsLoading(true);
    const articleRef = collection(db, "articles");
    const querySearch = query(articleRef, where("author_uid", "==", user.uid));

    const unsubscribe = onSnapshot(
      querySearch,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          doc_id: doc.id,
          ...doc.data(),
        }));
        const parseData = JSON.parse(JSON.stringify(data));
        setArticleData(parseData);
        dispatch({
          type: "SET_ARTICLE_DATA",
          payload: {
            articleData: parseData,
            tempArticleData: parseData,
          },
        });
        setIsLoading(false);
      },
      (error) => {
        console.error("Error during get my article:", error);
        setArticleData([]);
        dispatch({ type: "SET_ARTICLE_DATA", payload: [] });
        setIsLoading(false);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener
    return unsubscribe;
  }, [user.uid, dispatch]);

  useEffect(() => {
    const unsubscribe = handleGetMyArticle();
    return () => unsubscribe(); // Unsubscribe when the component unmounts
  }, [handleGetMyArticle]);

  return { articleData, isLoading };
};

export default useGetMyArticle;
