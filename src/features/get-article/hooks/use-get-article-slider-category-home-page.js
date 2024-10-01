import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { useHomePageContext } from "../../../components/pages/home-page-components/context/home-page-context";
import { debounce } from "lodash";
import useUser from "../../auth/hooks/use-user";

const useGetArticleSliderCategoryHomePage = ({ category }) => {
  const { user } = useUser();
  const { dispatch } = useHomePageContext();
  const [currentCategory, setCurrentCategory] = useState(category);
  const [articleList, setArticleList] = useState([]);
  const [isLastArticle, setIsLastArticle] = useState(false);
  const [lastVisibleDoc, setLastVisibleDoc] = useState(null);
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  // Helper to reset article state
  const resetState = useCallback(() => {
    setArticleList([]);
    setLastVisibleDoc(null);
    setCurrentCategory(category);
  }, [category]);

  const handleValidateUserNotLogin = useCallback(() => {
    if (!user) {
      setIsLastArticle(false);
      return true;
    } else {
      return false;
    }
  }, [user, setIsLastArticle]);

  // Build Firestore query based on category
  const buildQuery = useCallback(() => {
    const articleRef = collection(db, "articles");
    const baseQuery = [orderBy("createdAt", "desc"), where("reviewStatus", "==", "approved")];
    const limitFetchArticle = 2;

    if (category === "untukmu") {
      return lastVisibleDoc
        ? query(articleRef, ...baseQuery, startAfter(lastVisibleDoc), limit(limitFetchArticle))
        : query(articleRef, ...baseQuery, limit(limitFetchArticle));
    } else {
      return lastVisibleDoc
        ? query(
            articleRef,
            ...baseQuery,
            where("topicNames", "array-contains", category.toLowerCase()),
            startAfter(lastVisibleDoc),
            limit(limitFetchArticle)
          )
        : query(
            articleRef,
            ...baseQuery,
            where("topicNames", "array-contains", category.toLowerCase()),
            limit(limitFetchArticle)
          );
    }
  }, [category, lastVisibleDoc]);

  // Main fetch function for articles
  const handleFetchArticles = useCallback(async () => {
    if (!category.trim()) return;

    setFetchStatus({ isLoading: true, isError: false });

    try {
      const articleQuery = buildQuery();
      const articlesSnapshot = await getDocs(articleQuery);
      processFetchedArticles(articlesSnapshot);
    } catch (error) {
      setFetchStatus({ isLoading: false, isError: true });
      console.error("Error fetching articles:", error.message);
    }
  }, [category, buildQuery]);

  // Process fetched articles and update state
  const processFetchedArticles = (snapshot) => {
    const fetchedArticles = snapshot.docs.map((doc) => ({
      doc_id: doc.id,
      ...doc.data(),
    }));

    if (snapshot.docs.length > 0) {
      setLastVisibleDoc(snapshot.docs[snapshot.docs.length - 1]);
      setIsLastArticle(false);
    } else {
      setIsLastArticle(true);
    }

    setArticleList((prev) => [...prev, ...fetchedArticles]);
    setFetchStatus({ isLoading: false, isError: false });
  };

  const fetchData = useCallback(() => handleFetchArticles(), [handleFetchArticles]);
  const debounceFetch = useCallback(debounce(fetchData, 500), [fetchData]); // eslint-disable-line

  // Function to handle scrolling to the top and resetting the state
  const handleScrollToTopAndReset = (resetState) => {
    // Check if scroll is already at the top
    if (window.scrollY > 0) {
      // Scroll to the top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Function to listen for when the scroll reaches the top
      const onScrollToTop = () => {
        if (window.scrollY === 0) {
          // Once at the top, reset the state
          resetState();
          // Remove the scroll listener after reaching the top
          window.removeEventListener("scroll", onScrollToTop);
        }
      };

      // Add scroll listener to track the position while scrolling
      window.addEventListener("scroll", onScrollToTop);
    } else {
      // If already at the top, reset the state immediately
      resetState();
    }
  };

  useEffect(() => {
    // Trigger scroll and reset state when category changes
    currentCategory !== category && handleScrollToTopAndReset(resetState);
  }, [category, resetState, currentCategory]);

  // Initial fetch or when category changes
  useEffect(() => {
    articleList.length === 0 && handleFetchArticles();
  }, [handleFetchArticles, articleList.length]);

  // Infinite scroll implementation logic
  useEffect(() => {
    const handleScroll = () => {
      if (handleValidateUserNotLogin()) return;
      if (isLastArticle) return;
      if (articleList.length === 0) return;
      const distanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      if (distanceToBottom <= 200 && articleList.length > 0) debounceFetch();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [debounceFetch, articleList.length, isLastArticle, handleValidateUserNotLogin]);

  // Update context with fetched articles and status
  useEffect(() => {
    dispatch({ type: "SET_HOME_PAGE_ARTICLE_LIST_BY_CATEGORY", payload: articleList });
    dispatch({ type: "SET_FETCH_STATUS", payload: fetchStatus });
  }, [articleList, dispatch, fetchStatus]);

  return { articleList, isLastArticle };
};

export default useGetArticleSliderCategoryHomePage;
