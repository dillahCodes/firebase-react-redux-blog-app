import { message, Typography } from "antd";
import { addDoc, collection, getDocs, increment, limit, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db, storage } from "../../../firebase/firebase-services";
import { useNavigate } from "react-router-dom";
import renameFile from "../../../utils/rename-file";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import useUser from "../../auth/hooks/use-user";
import Compressor from "compressorjs";
import { v4 as uuidv4 } from "uuid";

const compressAndUploadImage = (file, storageRef) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      convertTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      convertSize: 1 * 1024 * 1024,
      async success(result) {
        try {
          await uploadBytes(storageRef, result);
          const downloadUrl = await getDownloadURL(storageRef);
          resolve(downloadUrl);
        } catch (error) {
          reject(error);
        }
      },
      error(error) {
        console.error("Error during compress main image:", error);
        reject(error);
      },
    });
  });
};

const { Text } = Typography;
const useUpdateArticle = (articleId, articleTitle, articleTags, articleMainImageFile, articleContent, setModalVisible) => {
  // console.log(tempDataArticleState);
  const { user } = useUser();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const showWarningMessage = (message) => {
    messageApi.open({
      type: "warning",
      content: <Text className="font-roboto-slab capitalize text-xs">{message}</Text>,
    });
  };

  const validateFields = () => {
    const validations = [
      { condition: !articleId, message: "artikel id tidak ditemukan" },
      { condition: !articleTitle || articleTitle.trim() === "", message: "judul artikel tidak ditemukan" },
      { condition: articleTags.length === 0, message: "masukan setidaknya 1 topic artikel" },
      {
        condition: !articleContent || articleContent.trim() === "" || articleContent === "<p><br></p>",
        message: "masukan konten artikel",
      },
    ];

    for (const { condition, message } of validations) {
      if (condition) {
        showWarningMessage(message);
        setModalVisible((prev) => !prev);
        return false;
      }
    }

    return true;
  };

  const updateTitleIfNeeded = async (articleRef, currentTitle) => {
    if (articleTitle !== currentTitle) {
      await updateDoc(articleRef, {
        title: articleTitle,
        reviewStatus: "pending",
        updatedAt: serverTimestamp(),
      });
    }
  };

  const updateTagsIfNeeded = async (articleRef, currentTags) => {
    const articleTagsName = articleTags.map((tag) => tag.topic_name.trim().toLowerCase());
    const isAllTagsMatch =
      articleTagsName.length === currentTags.length && articleTagsName.every((tag) => currentTags.includes(tag));

    if (!isAllTagsMatch) {
      await addNewTopicsIfNeeded(articleTagsName);
      await updateDoc(articleRef, {
        topicNames: articleTagsName,
        reviewStatus: "pending",
        updatedAt: serverTimestamp(),
      });
    }
  };

  const addNewTopicsIfNeeded = async (articleTagsName) => {
    const topicsCollectionRef = collection(db, "topics-article");
    const topicsDocumentRef = query(topicsCollectionRef, where("topic_name", "in", articleTagsName), limit(5));
    const tagSnapshot = await getDocs(topicsDocumentRef);

    const existingTopics = new Set(tagSnapshot.docs.map((doc) => doc.data().topic_name));

    for (const topic of articleTags) {
      const topicName = topic.topic_name.trim().toLowerCase();
      if (!existingTopics.has(topicName)) {
        await addDoc(topicsCollectionRef, {
          topic_id: uuidv4(),
          topic_name: topic.topic_name,
          topic_count: 0,
          topic_follower: 0,
        });
      }
    }
  };

  const updateMainImageIfNeeded = async (articleRef) => {
    if (articleMainImageFile) {
      const renamedMainImage = renameFile(articleMainImageFile, "main-image");
      const firebaseMainImageStorageRef = ref(storage, `article-images/${user.uid}/${articleId}/${renamedMainImage.name}`);
      const mainImageDownloadUrl = await compressAndUploadImage(renamedMainImage, firebaseMainImageStorageRef);

      await updateDoc(articleRef, {
        mainImage: mainImageDownloadUrl,
        reviewStatus: "pending",
        updatedAt: serverTimestamp(),
      });
    }
  };

  const updateContentIfNeeded = async (articleRef, currentContent) => {
    if (articleContent !== currentContent) {
      const currentImageIds = extractImageIdsFromContent(articleContent);
      await deleteUnusedImages(articleId, currentImageIds);

      await updateDoc(articleRef, {
        content: articleContent,
        reviewStatus: "pending",
        updatedAt: serverTimestamp(),
      });
    }
  };

  const updateArticleStatus = async (articleRef) => {
    await updateDoc(articleRef, {
      reviewStatus: "pending",
      articleOwnerPhotoURL: user.photoURL,
      updatedAt: serverTimestamp(),
    });
  };

  const extractImageIdsFromContent = (content) => {
    const currentDOMImages = new DOMParser().parseFromString(content, "text/html").images;
    return Array.from(currentDOMImages).map((img) => img.id);
  };

  const deleteUnusedImages = async (articleId, currentImageIds) => {
    const firebaseStorageRef = ref(storage, `article-images/${user.uid}/${articleId}`);
    const result = await listAll(firebaseStorageRef);
    const fileNames = result.items.map((itemRef) => itemRef.name);

    const filesToDelete = fileNames.filter((fileName) => fileName !== "main-image" && !currentImageIds.includes(fileName));
    for (const fileName of filesToDelete) {
      const fileRef = ref(storage, `article-images/${user.uid}/${articleId}/${fileName}`);
      await deleteObject(fileRef);
    }
  };

  const decrementTopicCountInPendingArticle = async (topicNames) => {
    for (const topic of topicNames) {
      const topicRef = collection(db, "topics-article");
      const topicQuery = query(topicRef, where("topic_name", "==", topic));
      const querySnapshot = await getDocs(topicQuery);
      const topicsData = querySnapshot.docs[0];
      if (topicsData.data().topic_count > 0) await updateDoc(topicsData.ref, { topic_count: increment(-1) });
    }
  };

  const handleUpdateArticle = async () => {
    if (!validateFields()) return;

    try {
      const articleRefCollection = collection(db, "articles");
      const articleQuery = query(articleRefCollection, where("id", "==", articleId));
      const snapshot = await getDocs(articleQuery);

      if (snapshot.size === 0) throw new Error(`artikel id ${articleId} tidak ditemukan`);

      const articleRef = snapshot.docs[0].ref;
      const articleData = snapshot.docs[0].data();

      await updateArticleStatus(articleRef);
      await updateTitleIfNeeded(articleRef, articleData.title);
      await updateTagsIfNeeded(articleRef, articleData.topicNames);
      await updateMainImageIfNeeded(articleRef);
      await updateContentIfNeeded(articleRef, articleData.content);
      await decrementTopicCountInPendingArticle(articleData.topicNames);

      messageApi.open({
        type: "success",
        content: <Text className="font-roboto-slab capitalize text-xs">artikel berhasil diperbarui</Text>,
      });

      setTimeout(() => navigate(`/artikelku`), 1500);
      setModalVisible(false);
    } catch (error) {
      console.error("Error while updating article", error);
      messageApi.open({
        type: "error",
        content: <Text className="font-roboto-slab capitalize text-xs">gagal memperbarui artikel, silahkan coba lagi</Text>,
      });
    }
  };

  return { handleUpdateArticle, messageContextHolder: contextHolder };
};

export default useUpdateArticle;
