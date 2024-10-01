import { Skeleton } from "antd";
import classNames from "classnames";
import PropTypes from "prop-types";
import "./style/preview-article-style.css";

const PreviewArticleMainImage = ({ mainImage }) => {
  //   const mainImage = useSelector((state) => state.postData.main_image_content_url);
  return (
    <div className="flex items-center justify-center w-full h-full mb-3 ">
      {/* skeleton image preview */}
      {!mainImage && <Skeleton.Image active className="w-full  min-h-[150px] sm:min-h-[200px] max-h-[200px]  sm:max-h-[300px]" />}

      {/* image preview */}
      {mainImage && (
        <img
          src={mainImage}
          alt="preview"
          className={classNames("h-[300px] w-full object-cover", {
            hidden: !mainImage,
          })}
        />
      )}
    </div>
  );
};

export default PreviewArticleMainImage;

PreviewArticleMainImage.propTypes = {
  mainImage: PropTypes.string,
};
