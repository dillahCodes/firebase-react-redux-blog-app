import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";

const useRejectArticleList = () => {
  const handleRejectArticle = async (articleId, message) => {
    try {
      const articleDocRef = doc(db, "articles", articleId);
      const articleDoc = await getDoc(articleDocRef);
      const articleSnapshot = articleDoc.data();

      if (!articleSnapshot) return console.error("Article not found");
      else {
        const updatedArticle = { ...articleSnapshot, reviewStatus: "rejected", reasonRejected: message };
        await updateDoc(articleDocRef, updatedArticle);
      }
    } catch (error) {
      console.error("Error while rejecting article: ", error);
    }
  };

  return {
    handleRejectArticle,
  };
};

export default useRejectArticleList;
