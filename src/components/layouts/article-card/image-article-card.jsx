import classNames from "classnames";
import { isMobile } from "react-device-detect";
import { myThemeConfigs } from "../../../theme/antd-theme";
import { Skeleton } from "antd";
import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ImageArticleCard = ({ mainImage, isLoading }) => {
  if (isLoading) {
    return (
      <div
        className={classNames("w-[150px]  h-[120px] border rounded-md overflow-hidden", {
          "w-[110px] h-[110px] min-w-[110px] min-h-[110px]": isMobile,
        })}
        style={myThemeConfigs.siderBorderStyle}
      >
        <Skeleton.Image className="w-full h-full" active />
      </div>
    );
  }

  return (
    <div
      className={classNames("w-[150px]  h-[120px] border rounded-md overflow-hidden", {
        "w-[110px] h-[110px] min-w-[110px] min-h-[110px]": isMobile,
      })}
      style={myThemeConfigs.siderBorderStyle}
    >
      {/* <img src={mainImage} alt={"article main image"} className="w-full h-full object-cover" loading="lazy" /> */}
      <LazyLoadImage
        alt="article main image"
        loading={"lazy"}
        className="w-full h-full"
        src={mainImage}
        effect="black-and-white"
      />
    </div>
  );
};

export default ImageArticleCard;

ImageArticleCard.propTypes = {
  mainImage: PropTypes.string,
  isLoading: PropTypes.bool,
};
