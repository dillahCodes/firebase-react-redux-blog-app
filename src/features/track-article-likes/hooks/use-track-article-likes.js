import { useState, useEffect, useCallback } from "react";
import { db } from "../../../firebase/firebase-services";
import {
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import useUser from "../../auth/hooks/use-user";
import { v4 as uuidv4 } from "uuid";

// Function to manage article likes
const useTrackArticleLikes = ({ article_doc_id }) => {
  const { user } = useUser();
  const [isArticleLiked, setIsArticleLiked] = useState(false);

  // Update article like count and create/delete like log
  const updateArticleLike = useCallback(
    async (isLiked) => {
      if (!user || !article_doc_id) return;
      const articleDocRef = doc(db, "articles", article_doc_id);

      if (isLiked) {
        // Delete user's like log and decrement article like count
        const articleLikesQuery = query(
          collection(db, "article-likes-logs"),
          where("user_id", "==", user.uid),
          where("article_doc_id", "==", article_doc_id)
        );

        const querySnapshot = await getDocs(articleLikesQuery);
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(docSnapshot.ref);
        });

        await updateDoc(articleDocRef, {
          article_like: increment(-1),
        });
      } else {
        // Increment article like count and create a new like log
        await updateDoc(articleDocRef, {
          article_like: increment(1),
        });

        await addDoc(collection(db, "article-likes-logs"), {
          user_id: user.uid,
          article_doc_id,
          like_log_id: uuidv4(),
          created_at: serverTimestamp(),
        });
      }
    },
    [article_doc_id, user]
  );

  // Handle like action by user
  const handleLikeArticle = useCallback(async () => {
    if (!user || !article_doc_id) return;

    try {
      await updateArticleLike(isArticleLiked);
    } catch (error) {
      console.error("Error handling like action:", error.message);
    }
  }, [article_doc_id, user, isArticleLiked, updateArticleLike]);

  // Listen to real-time updates of the article like status
  useEffect(() => {
    if (!user || !article_doc_id) return;

    const articleLikesQuery = query(
      collection(db, "article-likes-logs"),
      where("user_id", "==", user.uid),
      where("article_doc_id", "==", article_doc_id)
    );

    const unsubscribe = onSnapshot(
      articleLikesQuery,
      (querySnapshot) => {
        const isArticleLiked = querySnapshot.docs.length > 0;
        setIsArticleLiked(isArticleLiked);
      },
      (error) => console.error("Error tracking article likes:", error.message)
    );

    return () => unsubscribe();
  }, [article_doc_id, user]);

  return { isArticleLiked, handleLikeArticle };
};

export default useTrackArticleLikes;
