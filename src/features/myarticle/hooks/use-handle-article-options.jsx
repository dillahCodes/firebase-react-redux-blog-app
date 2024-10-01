import { message, Modal, Typography } from "antd";
import { db, storage } from "../../../firebase/firebase-services";
import { collection, deleteDoc, doc, getDoc, getDocs, increment, query, updateDoc, where } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteObject, listAll, ref } from "firebase/storage";

const { Text } = Typography;
const useHandleArticleOptions = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams(); // eslint-disable-line
  const [modal, contextHolder] = Modal.useModal();
  const [messageApi, messageContextHolder] = message.useMessage();

  const handleDeleteArticle = (articleId) => {
    modal.confirm({
      title: <Text className="text-sm font-roboto-slab">Hapus Artikel</Text>,
      content: <Text className="text-xs font-roboto-slab">Apakah anda yakin ingin menghapus artikel ini?</Text>,
      cancelText: <Text className="text-xs capitalize font-roboto-slab">batal</Text>,
      okText: <Text className="text-xs capitalize font-roboto-slab hover:text-white transition-all duration-300">Hapus</Text>,
      onOk: async () => {
        try {
          const articleDocRef = doc(db, "articles", articleId);
          const documentSnapshot = await getDoc(articleDocRef);
          const articleDataId = documentSnapshot.data().id;
          const articleAuthorId = documentSnapshot.data().author_uid;

          // delete image article in firebase storage
          const fileRef = ref(storage, `article-images/${articleAuthorId}/${articleDataId}/`);
          const listResult = await listAll(fileRef);
          await Promise.all(listResult.items.map((item) => deleteObject(item)));

          // fetch article topics and decrement article topics if topic_count > 0
          const articleTopic = documentSnapshot.data().topicNames;
          for (const topic of articleTopic) {
            const topicRef = collection(db, "topics-article");
            const topicQuery = query(topicRef, where("topic_name", "==", topic));
            const querySnapshot = await getDocs(topicQuery);
            const topicsData = querySnapshot.docs[0];
            if (topicsData.data().topic_count > 0) await updateDoc(topicsData.ref, { topic_count: increment(-1) });
          }

          // then delete article
          await deleteDoc(articleDocRef);
        } catch (error) {
          console.error("Error while deleting article: ", error);
        }
      },
    });
  };

  const handleEditArticle = (articleId) => {
    setParams({ id: articleId }, { replace: false });
    navigate(`/edit-artikel?id=${articleId}`, { replace: false });
  };

  const comingSoonHandler = (type) => {
    messageApi.info({
      type: "info",
      content: <Text className="text-xs font-roboto-slab">{type} action is Coming Soon</Text>,
    });
  };

  return {
    handleDeleteArticle,
    handleEditArticle,
    comingSoonHandler,
    optiosModalArticleContextHolder: contextHolder,
    messageContextHolder,
  };
};

export default useHandleArticleOptions;
