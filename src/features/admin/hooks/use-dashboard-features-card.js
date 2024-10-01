import { useCallback, useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-services";
import { collection, getCountFromServer, getDocs, query, where } from "firebase/firestore";

const useDashboardFeaturesCard = () => {
  const [data, setData] = useState({
    totalUser: 0,
    totalArticlesPending: 0,
    totalArticlesAccepted: 0,
    totalArticleTopics: 0,
  });

  const handleGetTotalUser = useCallback(async () => {
    const userDocRef = collection(db, "users-role");
    try {
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR !== "true") {
        const countSnapshot = await getCountFromServer(userDocRef);
        setData((prev) => ({ ...prev, totalUser: countSnapshot.data().count }));
        return countSnapshot.data().count;
      } else {
        const snapshot = await getDocs(userDocRef);
        setData((prev) => ({ ...prev, totalUser: snapshot.size }));
        return snapshot.size;
      }
    } catch (error) {
      console.error("Error fetching total article count: ", error);
      return 0;
    }
  }, []);

  const handleGetTotalPendingArticle = useCallback(async () => {
    const articlesPendingRef = collection(db, "articles");

    try {
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR !== "true") {
        const articlesQuery = query(articlesPendingRef, where("reviewStatus", "==", "pending"));
        const countSnapshot = await getCountFromServer(articlesQuery);
        setData((prev) => ({ ...prev, totalArticlesPending: countSnapshot.data().count }));
        return countSnapshot.data().count;
      } else {
        const articlesQuery = query(articlesPendingRef, where("reviewStatus", "==", "pending"));
        const snapshot = await getDocs(articlesQuery);
        setData((prev) => ({ ...prev, totalArticlesPending: snapshot.size }));
        return snapshot.size;
      }
    } catch (error) {
      console.error("Error while getting total pending article: ", error);
    }
  }, []);

  const handleGetAprovedArticle = useCallback(async () => {
    const articlesAprovedRef = collection(db, "articles");
    try {
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR !== "true") {
        const articlesQuery = query(articlesAprovedRef, where("reviewStatus", "==", "approved"));
        const countSnapshot = await getCountFromServer(articlesQuery);
        setData((prev) => ({ ...prev, totalArticlesAccepted: countSnapshot.data().count }));
        return countSnapshot.data().count;
      } else {
        const articlesQuery = query(articlesAprovedRef, where("reviewStatus", "==", "approved"));
        const snapshot = await getDocs(articlesQuery);
        setData((prev) => ({ ...prev, totalArticlesAccepted: snapshot.size }));
        return snapshot.size;
      }
    } catch (error) {
      console.error("Error while getting total Aproved article: ", error);
    }
  }, []);

  const handleGetTotalArticleTopics = useCallback(async () => {
    try {
      if (import.meta.env.VITE_USE_FIREBASE_EMULATOR !== "true") {
        const articlesTopicsRef = collection(db, "topics-article");
        const countSnapshot = await getCountFromServer(articlesTopicsRef);
        setData((prev) => ({ ...prev, totalArticleTopics: countSnapshot.data().count }));
        return countSnapshot.data().count;
      } else {
        const articlesTopicsRef = collection(db, "topics-article");
        const snapshot = await getDocs(articlesTopicsRef);
        setData((prev) => ({ ...prev, totalArticleTopics: snapshot.size }));
        return snapshot.size;
      }
    } catch (error) {
      console.error("Error while getting total Aproved article: ", error);
    }
  }, []);

  useEffect(() => {
    handleGetTotalUser();
  }, [handleGetTotalUser]);

  useEffect(() => {
    handleGetTotalPendingArticle();
  }, [handleGetTotalPendingArticle]);

  useEffect(() => {
    handleGetAprovedArticle();
  }, [handleGetAprovedArticle]);

  useEffect(() => {
    handleGetTotalArticleTopics();
  }, [handleGetTotalArticleTopics]);

  return {
    totalUser: data.totalUser,
    totalArticlesPending: data.totalArticlesPending,
    totalArticlesAccepted: data.totalArticlesAccepted,
    totalArticleTopics: data.totalArticleTopics,
  };
};

export default useDashboardFeaturesCard;
