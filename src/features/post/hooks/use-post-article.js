import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import useUser from "../../auth/hooks/use-user";
import { db, storage } from "../../../firebase/firebase-services";
import { addDoc, collection, serverTimestamp, query, where, limit, getDocs } from "firebase/firestore";
import renameFile from "../../../utils/rename-file";
import Compressor from "compressorjs";
import { useSelector } from "react-redux";

// Function to compress and upload images to Firebase Storage
const compressAndUploadImage = (file, storageRef) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8,
      convertTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      convertSize: 1 * 1024 * 1024, // doc: https://github.com/fengyuanchen/compressorjs/blob/main/README.md
      async success(result) {
        try {
          const resizeImageFile = result;
          await uploadBytes(storageRef, resizeImageFile);
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

const usePostArticle = () => {
  const { article_title, article_id, article_tags, main_image_content, article_content } = useSelector((state) => state.postData);
  const { user } = useUser();

  const handlePostArticle = async () => {
    // Validation checks
    if (!article_id || !article_title || !article_tags.length || !main_image_content || article_content === "<p><br></p>") {
      return {
        success: false,
        message: "judul, topics, gambar utama, dan konten harus diisi",
      };
    } else if (!user) {
      return alert("Anda harus login terlebih dahulu");
    }

    try {
      // Rename and compress the main image before uploading it to Firebase Storage
      const renamedMainImage = renameFile(main_image_content, "main-image");
      const firebaseMainImageStorageRef = ref(storage, `article-images/${user.uid}/${article_id}/${renamedMainImage.name}`);
      const mainImageDownloadUrl = await compressAndUploadImage(renamedMainImage, firebaseMainImageStorageRef);

      // Create a reference to the topics collection
      const topicsCollectionRef = collection(db, "topics-article");
      const topicNames = article_tags.map((topic) => topic.topic_name.trim().toLowerCase());

      // Fetch existing topics from Firestore
      const topicsDocumentRef = query(topicsCollectionRef, where("topic_name", "in", topicNames), limit(5));
      const tagSnapshot = await getDocs(topicsDocumentRef);

      // Extract existing topics
      const existingTopics = new Set();
      tagSnapshot.forEach((doc) => existingTopics.add(doc.data().topic_name));

      // Add new topics to Firestore if they don't already exist
      for (const topic of article_tags) {
        const topicName = topic.topic_name.trim().toLowerCase();
        if (!existingTopics.has(topicName)) {
          await addDoc(topicsCollectionRef, {
            topic_id: topic.topic_id,
            topic_name: topicName,
            topic_count: 0,
            topic_follower: 0,
          });
        }
      }

      // Parse the article content to extract image IDs from the DOM
      const currentDOMImages = new DOMParser().parseFromString(article_content, "text/html").images;
      const currentImageIds = Array.from(currentDOMImages).map((img) => img.id);

      // Retrieve all images currently stored in Firebase Storage for this article
      const firebaseStorageRef = ref(storage, `article-images/${user.uid}/${article_id}`);
      const result = await listAll(firebaseStorageRef);
      const fileNames = result.items.map((itemRef) => {
        const fullPath = itemRef.fullPath;
        const segments = fullPath.split("/");
        return segments[segments.length - 1];
      });

      // Identify and delete unused images from Firebase Storage
      const filesToDelete = fileNames.filter((fileName) => fileName !== "main-image" && !currentImageIds.includes(fileName));
      for (const fileName of filesToDelete) {
        const fileRef = ref(storage, `article-images/${user.uid}/${article_id}/${fileName}`);
        await deleteObject(fileRef);
      }

      // Upload article content to Firestore
      const timestamp = serverTimestamp();
      const firebaseArticleContentDocRef = collection(db, "articles");
      await addDoc(firebaseArticleContentDocRef, {
        id: article_id,
        title: article_title,
        mainImage: mainImageDownloadUrl,
        content: article_content,
        articleOwnerPhotoURL: user.photoURL,
        topicNames: topicNames,
        reviewStatus: "pending", // "pending", "approved", or "rejected"
        author_uid: user.uid,
        author_email: user.email,
        author_name: user.displayName,
        article_view: 0,
        article_comment: 0,
        article_like: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
      });

      return {
        success: true,
        message: "artikel telah berhasil ditambahkan",
      };
    } catch (error) {
      console.error("Error during post article: ", error);
      return {
        success: false,
        message: "terjadi kesalahan saat menambahkan artikel",
      };
    }
  };

  return {
    handlePostArticle,
  };
};

export default usePostArticle;
