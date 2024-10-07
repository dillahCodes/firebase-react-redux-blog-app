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
      async success(result) {
        try {
          // Upload the compressed image to Firebase Storage
          await uploadBytes(storageRef, result);

          // Get the download URL of the compressed image
          const downloadUrl = await getDownloadURL(storageRef);
          resolve(downloadUrl);
        } catch (error) {
          console.error("Error during image upload:", error);
          reject(error);
        }
      },
      error(error) {
        console.error("Error during image compression:", error);
        reject(error);
      },
    });
  });
};

// Function to update user profile image in Firebase Auth and Firestore
const updateUserProfileImage = async (downloadUrl) => {
  try {
    const { currentUser } = auth;

    // Reload user data and update Firebase Auth profile
    await reload(currentUser);
    await updateProfile(currentUser, { photoURL: downloadUrl });

    // Update photo URL in Firestore
    const userRef = collection(db, "users-role");
    const userQuery = query(userRef, where("user_id", "==", currentUser.uid));
    const querySnapShot = await getDocs(userQuery);
    const userDoc = querySnapShot.docs[0];

    if (!currentUser.photoURL && !querySnapShot.empty) {
      await updateDoc(userDoc.ref, { photoUrl: downloadUrl });
    } else if (!userDoc.data().photoUrl) await updateDoc(userDoc.ref, { photoUrl: downloadUrl });

    return {
      success: true,
      message: "Profile image successfully updated.",
    };
  } catch (error) {
    console.error("Error updating profile image in Firestore:", error);
    throw error;
  }
};

// Custom hook to update profile image
const useUpdateProfileImage = () => {
  const handleUpdateProfileImage = async (file) => {
    try {
      // Create a reference for the user's profile image in Firebase Storage
      const storageRef = ref(storage, `user-profile-images/${auth.currentUser.uid}`);

      // Compress the image and upload it to Firebase Storage
      const downloadUrl = await compressAndUploadImage(file, storageRef);

      // Update the profile image in Firebase Auth and Firestore
      const result = await updateUserProfileImage(downloadUrl);
      if (result.success) setTimeout(() => window.location.reload(), 500);

      return result;
    } catch (error) {
      console.error("Error during profile image update:", error.message);

      return {
        success: false,
        message: "Failed to update profile image. Please try again.",
      };
    }
  };

  return { handleUpdateProfileImage };
};

export default useUpdateProfileImage;
