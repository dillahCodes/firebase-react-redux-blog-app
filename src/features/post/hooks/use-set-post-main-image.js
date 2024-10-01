import { useDispatch, useSelector } from "react-redux";
import { updateMainImageContent, updateMainImageContentUrl } from "../post-data-slice";

const useSetPostMainImage = () => {
  const dispatch = useDispatch();
  const { main_image_content, main_image_content_url } = useSelector((state) => state.postData);

  const handleInputImageFileChange = (event) => {
    const { files } = event.target;
    const maxFileSizeMB = 10;

    if (files && files[0].size > maxFileSizeMB * 1024 * 1024) {
      alert(`Image size must be less than ${maxFileSizeMB}MB`);
      return { success: false, message: `Image size must be less than ${maxFileSizeMB}MB` };
    }

    if (files && files[0]) {
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        dispatch(updateMainImageContent(files[0]));
        dispatch(updateMainImageContentUrl(fileReader.result));
      };
      fileReader.readAsDataURL(files[0]);
    }
  };

  return { main_image_content, main_image_content_url, handleInputImageFileChange };
};

export default useSetPostMainImage;
