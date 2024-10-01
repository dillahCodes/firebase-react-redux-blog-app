import { useEffect } from "react";
import { debounce } from "lodash";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../../firebase/firebase-services";
import { v4 as uuidv4 } from "uuid";
import renameFile from "../../../../utils/rename-file";
import Compressor from "compressorjs";

// Uploads the image to Firebase and inserts it into the Quill editor
const uploadImageToFirebase = async (image, userId, articleId, quill) => {
  try {
    const storagePath = `article-images/${userId}/${articleId}/${image.name}`;
    const firebaseStorageRef = ref(storage, storagePath);

    await uploadBytes(firebaseStorageRef, image);
    const imageUrl = await getDownloadURL(firebaseStorageRef);

    const selectionRange = quill.getSelection();
    if (selectionRange) {
      quill.insertEmbed(selectionRange.index, "custom-image", { url: imageUrl, id: image.name });
    } else {
      console.warn("No selection range found");
    }
  } catch (error) {
    console.error("Error uploading image to Firebase:", error.message);
  }
};

// Handles image file compression and uploading to Firebase
const handleImageFileLoad = async (file, userId, articleId, quill) => {
  const maxFileSizeMB = 10;
  if (file.size > maxFileSizeMB * 1024 * 1024) {
    alert(`Image size must be less than ${maxFileSizeMB}MB`);
    return { success: false, message: `Image size must be less than ${maxFileSizeMB}MB` };
  }

  const newImageID = uuidv4();
  const renamedFile = renameFile(file, newImageID);

  new Compressor(renamedFile, {
    quality: 0.8,
    convertTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    convertSize: 1 * 1024 * 1024, // doc: https://github.com/fengyuanchen/compressorjs/blob/main/README.md
    success(compressedFile) {
      uploadImageToFirebase(compressedFile, userId, articleId, quill);
    },
    error: (error) => {
      console.error("Compression error:", error);
    },
  });
};

// Opens a file input dialog and handles image selection
// this function will be called when the user clicks on the image button
const openImageFileDialog = (userId, articleId, quill) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = () => {
    const file = input.files[0];
    if (file) {
      handleImageFileLoad(file, userId, articleId, quill);
    }
  };
};

const useTextEditor = ({ quill, quillRef, initialContent, onContentChange, userId, articleId }) => {
  //  reset editor content if initial content is empty
  useEffect(() => {
    if (!initialContent && quill) quill.setContents([{ insert: "" }]);
  }, [quill, initialContent]);

  // editor text change
  useEffect(() => {
    if (quill) {
      const debouncedTextChange = debounce(() => {
        const editorContent = quillRef.current?.firstChild?.innerHTML;
        onContentChange(editorContent); // Call prop callback
      }, 1000);

      quill.on("text-change", debouncedTextChange);
      return () => quill.off("text-change", debouncedTextChange);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, quillRef]);

  // set initial content
  useEffect(() => {
    if (quill && initialContent) {
      if (quill.getLength() === 1) {
        // quill.getLength() returns 1 if editor is empty
        quill.clipboard.dangerouslyPasteHTML(0, initialContent);
      }
    }
  }, [quill, initialContent]);

  // costume image editor button handler
  useEffect(() => {
    if (quill) {
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", () => openImageFileDialog(userId, articleId, quill));
    }
  }, [quill, userId, articleId]);
};

export default useTextEditor;
