import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { debounce } from "lodash";
import useUser from "../../auth/hooks/use-user";

const useGetArticleByTopicWithInfiniteScroll = ({ topicName, fetchLimit }) => {
  const { user } = useUser();
  // State to hold the current topic name
  const [currentTopicName, setCurrentTopicName] = useState(topicName);

  // State to manage article data and fetch status
  const [articleData, setArticleData] = useState({
    data: [],
    lastVisibleDoc: null,
    isLastArticle: false,
  });

  // State to track loading and error status during data fetching
  const [fetchStatus, setFetchStatus] = useState({
    isLoading: false,
    isError: false,
  });

  // Helper function to reset the state when the topic changes
  const resetState = useCallback(() => {
    setArticleData({
      data: [],
      lastVisibleDoc: null,
      isLastArticle: false,
    });
    setCurrentTopicName(topicName);
  }, [setArticleData, topicName]);

  // Validate the topic name is a non-empty string
  const isValidTopicName = useMemo(() => {
    return typeof topicName === "string" && topicName.trim().toLowerCase().length > 0;
  }, [topicName]);

  // Validate the fetch limit is a positive number
  const isValidLimit = useMemo(() => {
    return typeof fetchLimit === "number" && fetchLimit > 0;
  }, [fetchLimit]);

  // Determine if it's necessary to fetch more articles (infinite scroll)
  const isFetchInfiniteScroll = useMemo(() => {
    return isValidTopicName && isValidLimit && articleData.data.length > 0 && !articleData.isLastArticle && user;
  }, [articleData.data, isValidTopicName, isValidLimit, articleData.isLastArticle, user]);

  // Determine if it's necessary to perform an initial fetch (first load)
  const isFetchInitial = useMemo(() => {
    return articleData.data.length === 0 && !articleData.isLastArticle;
  }, [articleData.data, articleData.isLastArticle]);

  // Function to build the Firestore query for fetching articles
  const buildQuery = useCallback(() => {
    const articleRef = collection(db, "articles");
    const baseQuery = [
      orderBy("createdAt", "desc"), // Order articles by creation date
      where("reviewStatus", "==", "approved"), // Only fetch approved articles
      where("topicNames", "array-contains", topicName), // Filter articles by topic
      limit(fetchLimit), // Limit the number of fetched articles
    ];

    // Apply pagination if there's a last visible document
    return articleData.lastVisibleDoc
      ? query(articleRef, ...baseQuery, startAfter(articleData.lastVisibleDoc))
      : query(articleRef, ...baseQuery);
  }, [articleData.lastVisibleDoc, fetchLimit, topicName]);

  // Function to fetch articles from Firestore
  const handleFetchArticles = useCallback(async () => {
    try {
      setFetchStatus((prev) => ({ ...prev, isLoading: true, isError: false }));

      const articleQuery = buildQuery(); // Build the query
      const articleSnapshot = await getDocs(articleQuery); // Fetch the articles

      processFetchedArticles(articleSnapshot); // Process the fetched articles
    } catch (error) {
      console.error("Error while fetching articles: ", error.message);
      setFetchStatus((prev) => ({ ...prev, isError: true, isLoading: false }));
    }
  }, [buildQuery]);

  // Function to process fetched articles and update state
  const processFetchedArticles = (snapshot) => {
    const fetchedArticles = snapshot.docs.map((doc) => ({
      doc_id: doc.id,
      ...doc.data(),
    }));

    if (snapshot.docs.length > 0) {
      // If articles are found, update last visible document for pagination
      setArticleData((prev) => ({
        ...prev,
        lastVisibleDoc: snapshot.docs[snapshot.docs.length - 1],
        isLastArticle: false,
        data: [...prev.data, ...fetchedArticles],
      }));
    } else {
      // If no more articles are found, mark the end of the list
      setArticleData((prev) => ({
        ...prev,
        isLastArticle: true,
      }));
    }

    // Reset loading status after articles are processed
    setFetchStatus((prev) => ({ ...prev, isLoading: false, isError: false }));
  };

  // Debounce the fetch function to avoid multiple rapid calls
  const debounceFetch = debounce(handleFetchArticles, 1000);

  // Infinite scroll implementation: fetch more articles when near the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = 200;
      const distanceToBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);

      if (distanceToBottom <= triggerHeight && isFetchInfiniteScroll) debounceFetch(); // Fetch more if near bottom
    };

    window.addEventListener("scroll", handleScroll); // Attach scroll listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up listener on unmount
      debounceFetch.cancel(); // Cancel debounced function if component unmounts
    };
  }, [debounceFetch, isFetchInfiniteScroll]);

  // Initial fetch when component mounts
  useEffect(() => {
    if (isFetchInitial) handleFetchArticles();
  }, [handleFetchArticles, isFetchInitial]);

  // Function to handle scrolling to the top and resetting the state when the topic changes
  const handleScrollToTopAndReset = (resetState) => {
    if (window.scrollY > 0) {
      // If not already at the top, scroll to the top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });

      const onScrollToTop = () => {
        if (window.scrollY === 0) {
          // Once at the top, reset the state
          resetState();
          window.removeEventListener("scroll", onScrollToTop); // Remove listener after reaching the top
        }
      };

      window.addEventListener("scroll", onScrollToTop); // Add scroll listener
    } else {
      // If already at the top, reset the state immediately
      resetState();
    }
  };

  // Reset the state and scroll to the top when the topic name changes
  useEffect(() => {
    if (currentTopicName !== topicName) handleScrollToTopAndReset(resetState);
  }, [currentTopicName, topicName, resetState]);

  return {
    articleData: articleData.data, // Return the list of articles
    isLoading: fetchStatus.isLoading, // Return loading status
    isError: fetchStatus.isError, // Return error status
    isLastArticle: articleData.isLastArticle, // Return whether it's the last article
  };
};

export default useGetArticleByTopicWithInfiniteScroll;
