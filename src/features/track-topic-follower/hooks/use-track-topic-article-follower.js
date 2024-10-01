import { useCallback, useEffect, useState } from "react";
import useUser from "../../auth/hooks/use-user";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";
import { v4 as uuidv4 } from "uuid";

const useTrackTopicArticleFollower = ({ topic_article_doc_id }) => {
  const { user } = useUser();
  const [isUserHasFollowed, setIsUserHasFollowed] = useState(false);

  // Update  article topic follow count and create/delete like log
  const updateTopicArticleFollow = useCallback(
    async (isHasFollowed) => {
      if (!user || !topic_article_doc_id) return;
      const topicArticleDocRef = doc(db, "topics-article", topic_article_doc_id);

      if (isHasFollowed) {
        // Delete user follow log
        const articleLikesQuery = query(
          collection(db, "article-topic-follow-logs"),
          where("user_id", "==", user.uid),
          where("topic_doc_id", "==", topic_article_doc_id)
        );

        const querySnapshot = await getDocs(articleLikesQuery);
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(docSnapshot.ref);
        });

        await updateDoc(topicArticleDocRef, {
          topic_follower: increment(-1),
        });
      } else {
        // increment article topic follow count and create a new follow log
        await updateDoc(topicArticleDocRef, {
          topic_follower: increment(1),
        });

        await addDoc(collection(db, "article-topic-follow-logs"), {
          user_id: user.uid,
          topic_doc_id: topic_article_doc_id,
          follow_log_id: uuidv4(),
          created_at: serverTimestamp(),
        });
      }
    },
    [user, topic_article_doc_id]
  );

  // Handle follow/unfollow
  const handleFolowOrUnfollow = useCallback(async () => {
    if (!user || !topic_article_doc_id) return;

    try {
      await updateTopicArticleFollow(isUserHasFollowed);
    } catch (error) {
      console.error("Error handling like action:", error.message);
    }
  }, [updateTopicArticleFollow, isUserHasFollowed, user, topic_article_doc_id]);

  // Listen to real-time updates of the article  topic follow count
  useEffect(() => {
    if (!user || !topic_article_doc_id) return;

    const articleLikesQuery = query(
      collection(db, "article-topic-follow-logs"),
      where("user_id", "==", user.uid),
      where("topic_doc_id", "==", topic_article_doc_id)
    );

    const unsubscribe = onSnapshot(
      articleLikesQuery,
      (querySnapshot) => {
        const isUserHasFollowedTopic = querySnapshot.docs.length > 0;
        setIsUserHasFollowed(isUserHasFollowedTopic);
      },
      (error) => console.error("Error tracking article likes:", error.message)
    );

    return () => unsubscribe();
  }, [topic_article_doc_id, user]);

  return { handleFolowOrUnfollow, isUserHasFollowed };
};

export default useTrackTopicArticleFollower;
