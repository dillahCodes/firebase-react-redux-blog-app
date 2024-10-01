import { message, Typography } from "antd";
import classNames from "classnames";
import { useRef, useState } from "react";
import { MdOutlineCloudUpload } from "react-icons/md";

import PropTypes from "prop-types";
import ButtonComponent from "../../ui/button-component";
import useUpdateProfileImage from "../../../features/profile/hooks/use-update-profile-image";
import useUser from "../../../features/auth/hooks/use-user";
import { FaImage } from "react-icons/fa";

const { Text } = Typography;

const EditProfileImage = () => {
  const { user } = useUser();
  const { handleUpdateProfileImage } = useUpdateProfileImage();
  const inputImageRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [imageData, setImageData] = useState({
    imageDataFile: null,
    imageDataUrlPreview: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // validate file type
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      event.target.value = null;
      messageApi.open({
        type: "error",
        content: <Text className="font-roboto-slab capitalize text-sm">hanya mengizinkan file jpeg dan png</Text>,
      });

      setImageData((prevState) => ({
        ...prevState,
        imageDataFile: null,
        imageDataUrlPreview: "",
      }));
      return;
    }

    // image preview and compress image file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageData((prevState) => ({
          ...prevState,
          imageDataFile: file,
          imageDataUrlPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = () => document.getElementById("image-file").click();

  const handleConfirmUploadImage = async () => {
    // validate
    if (!imageData.imageDataFile) {
      messageApi.open({
        type: "warning",
        key: "upload-image-error",
        content: <Text className="font-roboto-slab capitalize text-xs">tidak ada gambar yang dipilih</Text>,
      });
      return;
    }

    if (imageData.imageDataFile.size > 5 * 1024 * 1024) {
      messageApi.open({
        type: "warning",
        key: "upload-image-error",
        content: <Text className="font-roboto-slab capitalize text-xs">ukuran gambar maksimal 5 MB</Text>,
      });
      return;
    }

    // upload request
    const result = await handleUpdateProfileImage(imageData.imageDataFile, user);
    if (result.success) {
      messageApi.open({
        key: "upload-image-success",
        type: "success",
        content: <Text className="font-roboto-slab capitalize text-xs">{result.message}</Text>,
      });
    } else {
      messageApi.open({
        key: "upload-image-error",
        type: "error",
        content: <Text className="font-roboto-slab text-red-500 capitalize text-xs">{result.message}</Text>,
      });
    }
  };

  return (
    <div className=" border-b  bg-[#dcfab6] rounded-md p-3" style={{ boxShadow: "2px 2px 0px 0px rgba(0, 0, 0, 1)" }}>
      {/* message */}
      {contextHolder}

      <Text className="font-roboto-slab capitalize text-sm font-medium">ubah foto profil</Text>

      {/* input file */}
      <input type="file" id="image-file" ref={inputImageRef} className="hidden" onChange={handleFileChange} />

      {/* button */}
      <div
        onClick={handleUploadImage}
        className={classNames(
          "w-[160px] h-[160px] flex-col transition-all duration-300 text-gray-500 flex items-center justify-center cursor-pointer group border rounded-md border-gray-500 mt-2 border-dashed",
          {
            "hover:text-[#58942e] hover:border-[#58942e]": true,
          }
        )}
      >
        <NotImagePlcaeHolder isImageUploaded={imageData.imageDataUrlPreview} />

        <div
          className={classNames("w-full h-full overflow-hidden relative", {
            "hidden ": !imageData.imageDataUrlPreview,
          })}
        >
          <div className="w-full h-full absolute bg-[rgba(0,0,0,0.4)] flex flex-col justify-center items-center">
            <span className={classNames("text-3xl text-[#b8e986] transition-all duration-300", {})}>
              <MdOutlineCloudUpload />
            </span>
            <Text className={classNames("font-roboto-slab text-xs text-[#b8e986] capitalize", {})}>upload image</Text>
          </div>
          <img
            src={imageData.imageDataUrlPreview}
            alt="image preview"
            className={classNames("w-full h-full object-cover", {
              hidden: !imageData.imageDataUrlPreview,
            })}
          />
        </div>
      </div>

      {/* button send image */}
      <ButtonComponent
        icon={<FaImage />}
        onClick={handleConfirmUploadImage}
        className="w-[160px] mt-2 bg-[#58942e] text-[#b8e986]  font-roboto-slab"
        type="primary"
      >
        ubah foto profil
      </ButtonComponent>
    </div>
  );
};

export default EditProfileImage;

const NotImagePlcaeHolder = ({ isImageUploaded }) => {
  return (
    <>
      <span
        className={classNames("text-3xl text-gray-500 transition-all duration-300", {
          "group-hover:text-[#58942e]": true,
          "hidden ": isImageUploaded,
        })}
      >
        <MdOutlineCloudUpload />
      </span>
      <Text
        className={classNames("font-roboto-slab text-xs text-gray-500 capitalize", {
          "group-hover:text-[#58942e]": true,
          "hidden ": isImageUploaded,
        })}
      >
        upload image
      </Text>
    </>
  );
};

NotImagePlcaeHolder.propTypes = {
  isImageUploaded: PropTypes.string,
};
