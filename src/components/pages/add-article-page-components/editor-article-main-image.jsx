import PropTypes from "prop-types";
import { Content } from "antd/es/layout/layout";
import classNames from "classnames";
import { Layout, Typography } from "antd";
import { useRef } from "react";
import { RiImageAddLine } from "react-icons/ri";
import useSetPostMainImage from "../../../features/post/hooks/use-set-post-main-image";

// main component
const { Text } = Typography;
const EditorMainImage = ({ ...props }) => {
  return (
    <Layout
      {...props}
      className="outline-dashed outline-gray-300 min-h-[150px] sm:min-h-[300px] max-h-[200px]  sm:max-h-[300px]  cursor-pointer hover:outline-[#58942e] transition-all duration-300   rounded-md"
    >
      <PreviewImage />
    </Layout>
  );
};

export default EditorMainImage;

// preview image
const PreviewImage = () => {
  const inputRef = useRef();
  const { main_image_content, main_image_content_url, handleInputImageFileChange } = useSetPostMainImage();

  return (
    <Content className="flex items-center group justify-center relative rounded-md overflow-hidden">
      {/* file input hidden by style */}
      <input
        ref={inputRef}
        type="file"
        name="main-image-content"
        id="main-image-content"
        className="hidden"
        onChange={handleInputImageFileChange}
      />
      {/* image field placeholder */}
      <MainImageImagePlaceholder
        className={classNames({
          " hidden": main_image_content,
        })}
      />

      {/* image preview */}
      <img
        src={main_image_content_url}
        alt="preview"
        className={classNames("h-full w-full object-cover", {
          " hidden": !main_image_content,
        })}
      />

      {/* image change image placeholder */}
      <MainImageChangeImagePlaceholder
        className={classNames("hidden", {
          "group-hover:flex": main_image_content,
        })}
        handeClick={() => inputRef.current.click()}
      />
    </Content>
  );
};

const MainImageImagePlaceholder = ({ className }) => {
  return (
    <label
      htmlFor="main-image-content"
      className={`h-full w-full group cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${className}`}
    >
      <RiImageAddLine className="sm:text-5xl text-3xl text-gray-300 group-hover:text-[#58942e] transition-all duration-300 " />
      <Text className="sm:text-sm text-xs font-roboto-slab transition-all duration-300 capitalize group-hover:text-[#58942e] text-slate-300">
        tambahkan Gambar Artikel
      </Text>
    </label>
  );
};

MainImageImagePlaceholder.propTypes = {
  className: PropTypes.string,
};

const MainImageChangeImagePlaceholder = ({ handeClick, className }) => {
  return (
    <Content
      className={`absolute bg-[rgba(0,0,0,0.6)] inset-0 flex flex-col items-center justify-center ${className}`}
      onClick={handeClick}
    >
      <RiImageAddLine className="sm:text-5xl text-3xl text-gray-300  transition-all duration-300 " />
      <Text className="sm:text-sm text-xs font-roboto-slab transition-all duration-300 capitalize  text-slate-300">
        ubah Gambar Artikel
      </Text>
    </Content>
  );
};

MainImageChangeImagePlaceholder.propTypes = {
  handeClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
