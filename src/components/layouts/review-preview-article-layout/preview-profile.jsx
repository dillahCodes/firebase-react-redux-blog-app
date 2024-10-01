import { myThemeConfigs } from "../../../theme/antd-theme";
import { Avatar, Flex, Typography } from "antd";
import PropTypes from "prop-types";
import calculateReadingTime from "../../../utils/calculate-reading-time";
import PreviewArticleOptionsButtons from "./preview-options";
import "./style/preview-article-style.css";
import formatEpochToIndonesianDate from "../../../utils/convert-time";

const { Text } = Typography;
const PreviewArticleProfile = ({
  content,
  photoURL,
  displayName,
  epochTime,
  likeCount,
  commentCount,
  likeHandler,
  isThisArticleLiked,
  isPreview,
  isUserLoggedIn,
}) => {
  const currentDate = formatEpochToIndonesianDate(epochTime || new Date().getTime() / 1000);

  return (
    <Flex vertical className="my-5">
      <Flex gap="middle" align="center">
        <div>
          <Avatar
            style={{
              cursor: "pointer",
              backgroundColor: myThemeConfigs.token.colorText,
              color: myThemeConfigs.token.colorLinkHover,
              border: "1px solid black",
              ...myThemeConfigs.buttonBorderList,
            }}
            src={photoURL || null}
            size={38}
          >
            <Text className=" transition-all text-[#dcfab6] text-lg  duration-300 capitalize font-roboto-slab ">
              {!photoURL && displayName?.charAt(0)}
            </Text>
          </Avatar>
        </div>
        <div>
          <Flex vertical className="w-full">
            <Flex align="center" gap="small">
              <Text className="text-sm font-roboto-slab">{displayName}</Text>
              <Text className="text-sm">•</Text>
              <Text className="text-sm capitalize font-roboto-slab cursor-pointer text-[#b8e986] font-medium">ikuti</Text>
            </Flex>
            <Flex align="center" gap="small">
              <Text className="text-xs font-roboto-slab">{calculateReadingTime(content)}</Text>
              <Text className="text-xs">•</Text>
              <Text className="text-xs capitalize font-roboto-slab  ">{currentDate}</Text>
            </Flex>
          </Flex>
        </div>
      </Flex>

      <PreviewArticleOptionsButtons
        likeHandler={likeHandler}
        isThisArticleLiked={isThisArticleLiked}
        isBorderActive
        likeCount={likeCount}
        isPreview={isPreview}
        commentCount={commentCount}
        isUserLoggedIn={isUserLoggedIn}
      />
    </Flex>
  );
};

export default PreviewArticleProfile;

PreviewArticleProfile.propTypes = {
  photoURL: PropTypes.string,
  displayName: PropTypes.string,
  content: PropTypes.string,
  epochTime: PropTypes.number,
  likeCount: PropTypes.number,
  commentCount: PropTypes.number,
  likeHandler: PropTypes.func,
  isThisArticleLiked: PropTypes.bool,
  isPreview: PropTypes.bool,
  isUserLoggedIn: PropTypes.bool,
};
