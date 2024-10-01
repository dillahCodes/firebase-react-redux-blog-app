import { useCallback, useEffect } from "react";
import { db } from "../../../firebase/firebase-services";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import useUser from "../../auth/hooks/use-user";
import { v4 as uuidv4 } from "uuid";

const useTrackArticleViews = ({ article_doc_id }) => {
  const { user } = useUser();

  const handleUpdateArticleView = useCallback(async () => {
    if (!article_doc_id || !user) return;

    try {
      const articleDocRef = doc(db, "articles", article_doc_id);
      const articleDoc = await getDoc(articleDocRef);

      if (articleDoc.exists()) {
        // get view log first
        const viewLogDocRef = collection(db, "article-view-logs");
        const viewLogDocRefQuery = query(
          viewLogDocRef,
          where("user_id", "==", user.uid),
          where("article_doc_id", "==", article_doc_id)
        );
        const querySnapshot = await getDocs(viewLogDocRefQuery);
        const isUserHasViewThisArticle = querySnapshot.docs.length > 0;

        if (!isUserHasViewThisArticle) {
          // increment article view
          const articleSnapshot = articleDoc.ref;
          await updateDoc(articleSnapshot, {
            article_view: increment(1),
          });

          // make view log
          await addDoc(viewLogDocRef, {
            user_id: user.uid, // foreign key
            article_doc_id: article_doc_id, // foreign key
            view_log_id: uuidv4(), // primary key
            created_at: serverTimestamp(),
          });
        }
      }
    } catch (error) {
      console.error("Error while updating article view: ", error);
    }
  }, [article_doc_id, user]);

  useEffect(() => {
    handleUpdateArticleView();
  }, [handleUpdateArticleView]);
};

export default useTrackArticleViews;
