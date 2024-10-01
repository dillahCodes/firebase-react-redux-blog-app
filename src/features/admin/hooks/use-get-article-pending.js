import { collection, getCountFromServer, getDocs, limit, onSnapshot, query, startAfter, where } from "firebase/firestore";
import { orderBy } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";

/**
 * Fetches the list of articles that are pending review
 * and handles the real-time updates to the list.
 * @returns {Object} An object containing the fetchPendingArticles function and the tableData state.
 */
const useGetArticlePending = () => {
  const [tableData, setTableData] = useState({
    data: [], // List of pending articles
    totalArticles: 0, // Total number of pending articles in server
    lastVisibleDoc: null, // The last document that was fetched
    isLoading: false, // Flag to indicate if the data is still loading
    pageSize: 5, // Number of articles to fetch per page
  });

  /**
   * Builds the query to fetch the articles based on the review status.
   * @param {Object} articlesRef - The Firestore collection reference for the articles.
   * @param {Object} startAfterDoc - The document to start fetching from.
   * @param {Number} pageSize - The number of articles to fetch per page.
   * @returns {Object} The Firestore query object.
   */
  const buildArticlesQuery = useCallback((articlesRef, startAfterDoc, pageSize) => {
    const baseQuery = query(articlesRef, orderBy("createdAt", "desc"));

    return startAfterDoc
      ? query(baseQuery, startAfter(startAfterDoc), where("reviewStatus", "==", "pending"), limit(pageSize))
      : query(baseQuery, where("reviewStatus", "==", "pending"), limit(pageSize));
  }, []);

  /**
   * Fetches the total count of articles that are pending review.
   * @param {Object} articlesRef - The Firestore collection reference for the articles.
   * @returns {Promise<Number>} The total count of articles.
   */
  const getTotalArticlesCount = useCallback(async (articlesRef) => {
    try {
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR !== "true") {
        const articlesQuery = query(articlesRef, where("reviewStatus", "==", "pending"));
        const countSnapshot = await getCountFromServer(articlesQuery);
        return countSnapshot.data().count;
      } else {
        const articlesQuery = query(articlesRef, where("reviewStatus", "==", "pending"));
        const snapshot = await getDocs(articlesQuery);
        return snapshot.size;
      }
    } catch (error) {
      console.error("Error fetching total article count: ", error);
      return 0;
    }
  }, []);

  /**
   * Fetches the list of articles that are pending review.
   * @param {Object} startAfterDoc - The document to start fetching from.
   * @returns {Function} A function to unsubscribe from the real-time listener.
   */
  const fetchPendingArticles = useCallback(
    async (startAfterDoc = null) => {
      setTableData((prevData) => ({ ...prevData, isLoading: true }));

      try {
        const articlesRef = collection(db, "articles");

        // Fetch or update the total articles count
        await getTotalArticlesCount(articlesRef).then((totalArticles) => {
          setTableData((prevData) => ({ ...prevData, totalArticles }));
        });

        const articlesQuery = buildArticlesQuery(articlesRef, startAfterDoc, tableData.pageSize);

        // Setting up the real-time listener
        const unsubscribe = onSnapshot(articlesQuery, (snapshot) => {
          const articles = snapshot.docs.map((doc) => ({ doc_id: doc.id, ...doc.data() }));
          const lastVisible = snapshot.docs[snapshot.docs.length - 1];

          setTableData((prevData) => ({
            ...prevData,
            data: startAfterDoc ? [...prevData.data, ...articles] : articles,
            lastVisibleDoc: snapshot.docs.length < tableData.pageSize ? null : lastVisible,
            isLoading: false,
          }));
        });

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching articles: ", error);
        setTableData((prevData) => ({ ...prevData, isLoading: false }));
      }
    },
    [buildArticlesQuery, getTotalArticlesCount, tableData.pageSize]
  );

  useEffect(() => {
    const unsubscribe = fetchPendingArticles();

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [fetchPendingArticles]);

  return { fetchPendingArticles, tableData, setTableData };
};

export default useGetArticlePending;
