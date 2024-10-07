import { Layout, Skeleton, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import classNames from "classnames";
import { useRef } from "react";
import { RiImageAddLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { useEditArticlePage } from "./context/edit-article-page-context";

// main component
const { Text } = Typography;
const EditorUpdateArticleMainImage = ({ ...props }) => {
  const { state } = useEditArticlePage();

  if (state.fetch_status.isLoading)
    return <Skeleton.Input className="w-full min-h-[150px] sm:min-h-[300px] max-h-[200px]  sm:max-h-[300px]" active />;

  return (
    <Layout
      {...props}
      className="outline-dashed outline-gray-300 min-h-[150px] sm:min-h-[300px] max-h-[200px]  sm:max-h-[300px]  cursor-pointer hover:outline-[#58942e] transition-all duration-300   rounded-md"
    >
      <PreviewImage />
    </Layout>
  );
};

export default EditorUpdateArticleMainImage;

// preview image
const PreviewImage = () => {
  const inputRef = useRef();
  const { state, dispatch } = useEditArticlePage();
  const { main_image_content, main_image_content_url } = state;
  const isMainImageNotEmpty = main_image_content || main_image_content_url;
  const isMainImageEmpty = !main_image_content && !main_image_content_url;

  const handleInputImageFileChange = (event) => {
    const file = event.target.files[0];
    const maxFileSizeMB = 10;

    if (file && file.size > maxFileSizeMB * 1024 * 1024) {
      alert(`Image size must be less than ${maxFileSizeMB}MB`);
      return { success: false, message: `Image size must be less than ${maxFileSizeMB}MB` };
    }

    if (file) {
      // file reader
      const reader = new FileReader();
      reader.onload = () => dispatch({ type: "SET_MAIN_IMAGE_CONTENT_URL", payload: reader.result });
      reader.readAsDataURL(file);

      dispatch({ type: "SET_MAIN_IMAGE_CONTENT", payload: file });
    }
  };

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
          " hidden": isMainImageNotEmpty,
        })}
      />

      {/* image preview */}
      <img
        src={main_image_content_url}
        alt="preview"
        className={classNames("h-full w-full object-cover", {
          " hidden": isMainImageEmpty,
        })}
      />

      {/* image change image placeholder */}
      <MainImageChangeImagePlaceholder
        className={classNames("hidden", {
          "group-hover:flex": isMainImageNotEmpty,
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
