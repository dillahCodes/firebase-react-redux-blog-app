import { Modal, Typography } from "antd";
import { collection, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;
const useAcceptArticle = () => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();

  const handleAcceptArticle = (articleId) => {
    modal.confirm({
      title: <Text className="font-roboto-slab text-sm">Terima artikel ini?</Text>,
      content: <Text className="font-roboto-slab text-sm">Anda yakin ingin menerima artikel ini?</Text>,
      onOk: () => {
        handleConfirmAcceptArticle(articleId);
        navigate("/dashboard-admin/persetujuan-artikel", { replace: true });
      },
    });
  };

  const handleConfirmAcceptArticle = async (articleId) => {
    try {
      const docRef = doc(db, "articles", articleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const article = docSnap.data();

        // update topic count
        const articleTopics = article.topicNames;
        for (const topic of articleTopics) {
          const topicRef = collection(db, "topics-article");
          const topicQuery = query(topicRef, where("topic_name", "==", topic));

          // Get the documents that match the query and increment the topic count
          const querySnapshot = await getDocs(topicQuery);
          const topicsData = querySnapshot.docs[0];
          await updateDoc(topicsData.ref, { topic_count: increment(1) });
        }

        // then update review status to approved
        const updatedArticle = { ...article, reviewStatus: "approved" };
        await updateDoc(docRef, updatedArticle);
      }
    } catch (error) {
      console.error("Error while accepting article: ", error);
    }
  };

  return { acceptArticleModalContext: contextHolder, handleAcceptArticle, handleConfirmAcceptArticle };
};

export default useAcceptArticle;
