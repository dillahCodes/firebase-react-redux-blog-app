import { v4 as uuidv4 } from "uuid";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import renameFile from "../../../../utils/rename-file";
import { storage } from "../../../../firebase/firebase-services";

const handleUploadImage = ({ userId, articleId }) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        handleImageFileLoad({ file, userId, articleId, resolve, reject });
      }
    };
  });
};

export default handleUploadImage;

// Handles image file compression and uploading to Firebase
const handleImageFileLoad = async ({ file, userId, articleId, resolve, reject }) => {
  const maxFileSizeMB = 10;
  if (file.size > maxFileSizeMB * 1024 * 1024) {
    alert(`Image size must be less than ${maxFileSizeMB}MB`);
    return reject({ success: false, message: `Image size must be less than ${maxFileSizeMB}MB` });
  }

  const newImageID = uuidv4();
  const renamedFile = renameFile(file, newImageID);
  const oldFileName = file.name;

  new Compressor(renamedFile, {
    quality: 0.8,
    convertTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    convertSize: 1 * 1024 * 1024,
    success(compressedFile) {
      uploadImageToFirebase({ image: compressedFile, userId, articleId, resolve, reject, oldFileName, newImageID });
    },
    error: (error) => {
      console.error("Compression error:", error);
      reject({ success: false, message: "Compression failed" });
    },
  });
};

// Uploads the image to Firebase and inserts it into the Quill editor
const uploadImageToFirebase = async ({ image, userId, articleId, resolve, reject, oldFileName, newImageID }) => {
  try {
    const storagePath = `article-images/${userId}/${articleId}/${image.name}`;
    const firebaseStorageRef = ref(storage, storagePath);

    await uploadBytes(firebaseStorageRef, image);
    const imageUrl = await getDownloadURL(firebaseStorageRef);
    resolve({
      success: true,
      imageUrl,
      message: "Image uploaded successfully",
      oldFileName,
      newImageID,
    });
  } catch (error) {
    console.error("Error uploading image to Firebase:", error.message);
    reject({
      success: false,
      imageUrl: null,
      message: "Error uploading image to Firebase",
    });
  }
};
