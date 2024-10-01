import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../firebase/firebase-services";
import Compressor from "compressorjs";
import { reload, updateProfile } from "firebase/auth";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";

// Function to compress and upload image
const compressAndUploadImage = (file, storageRef) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      convertTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
      convertSize: 0,
      success(result) {
        // Convert success callback to async function
        (async () => {
          try {
            // Upload the compressed image to Firebase Storage
            await uploadBytes(storageRef, result);

            // Get the download URL of the compressed image
            const downloadUrl = await getDownloadURL(storageRef);
            resolve(downloadUrl);

            if (!auth.currentUser.photoURL) {
              // update profile auth
              await reload(auth.currentUser);
              await updateProfile(auth.currentUser, {
                photoURL: downloadUrl,
              });

              // update in firestore
              const userRef = collection(db, "users-role");
              const userDocRef = query(userRef, where("user_id", "==", auth.currentUser.uid));
              const querySnapShot = await getDocs(userDocRef);
              const userDoc = querySnapShot.docs[0];
              await updateDoc(userDoc.ref, {
                photoUrl: downloadUrl,
              });
            }
          } catch (error) {
            console.error("Error during image upload:", error);
            reject(error);
          }
        })();
      },
      error(error) {
        console.error("Error during image compression:", error);
        reject(error);
      },
    });
  });
};

// Custom hook to update profile image
const useUpdateProfileImage = () => {
  const handleUpdateProfileImage = async (file) => {
    try {
      // Create a reference for the user's profile image in Firebase Storage
      const storageRef = ref(storage, `user-profile-images/${auth.currentUser.uid}`);

      // Compress the image and upload it to Firebase Storage
      await compressAndUploadImage(file, storageRef);

      setTimeout(() => {
        window.location.reload();
      }, 500);

      return {
        success: true,
        message: "foto profil berhasil diperbarui",
      };
    } catch (error) {
      // Log the error stack for detailed information
      console.error("Error during profile image update:", error.message);

      return {
        success: false,
        message: "Terjadi kesalahan saat memperbarui gambar profil, silahkan coba lagi.",
      };
    }
  };

  return { handleUpdateProfileImage };
};

export default useUpdateProfileImage;
